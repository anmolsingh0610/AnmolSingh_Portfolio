"use client";

import { MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";
import gsap from "gsap";

export default function MotionProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Manually force GSAP to respect reduced motion media queries
        let mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: reduce)", () => {
            // Disable GSAP animations seamlessly
            gsap.globalTimeline.timeScale(1000); // instantly complete animations
        });
        return () => mm.revert();
    }, []);

    return (
        <MotionConfig reducedMotion="user">
            {children}
        </MotionConfig>
    );
}
