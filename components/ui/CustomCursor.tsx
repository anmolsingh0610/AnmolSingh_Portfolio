"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Smooth springs for cursor followers to simulate gravity well delay
    const springX = useSpring(0, { stiffness: 300, damping: 28, mass: 0.5 });
    const springY = useSpring(0, { stiffness: 300, damping: 28, mass: 0.5 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            springX.set(e.clientX);
            springY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Identify clickable or magnetic objects to expand the cursor into a glow
            if (
                target.dataset.magnetic ||
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [springX, springY]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-exclusion"
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    width: isHovering ? 64 : 32,
                    height: isHovering ? 64 : 32,
                    border: isHovering ? "2px solid rgba(234, 88, 12, 0.8)" : "2px solid #f1f5f9",
                    backgroundColor: isHovering ? "rgba(234, 88, 12, 0.15)" : "transparent",
                }}
                transition={{ type: "tween", ease: "circOut", duration: 0.2 }}
            />
            {/* Tiny inner dot strictly attached to raw mouse position for precision */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 bg-rust-500 rounded-full pointer-events-none z-[10000]"
                animate={{
                    x: mousePosition.x - 4,
                    y: mousePosition.y - 4,
                    opacity: isHovering ? 0 : 1
                }}
                transition={{ type: "tween", duration: 0 }}
            />
        </>
    );
}
