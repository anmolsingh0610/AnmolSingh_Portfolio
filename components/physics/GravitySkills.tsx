"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { motion } from "framer-motion";

const skillsData = [
    { name: "C++", proficiency: 95, color: "#ffffff", border: "#f1f5f9" },
    { name: "Python", proficiency: 98, color: "#facc15", border: "#ca8a04" },
    { name: "Java", proficiency: 90, color: "#f97316", border: "#c2410c" },
    { name: "HTML", proficiency: 95, color: "#f97316", border: "#ea580c" },
    { name: "CSS", proficiency: 90, color: "#38bdf8", border: "#0284c7" },
    { name: "Metasploit", proficiency: 85, color: "#ef4444", border: "#b91c1c" },
    { name: "BurpSuite", proficiency: 85, color: "#f97316", border: "#c2410c" },
    { name: "Wireshark", proficiency: 80, color: "#38bdf8", border: "#0369a1" },
    { name: "Nmap", proficiency: 90, color: "#22c55e", border: "#16a34a" },
    { name: "GitHub", proficiency: 95, color: "#ffffff", border: "#64748b" },
    { name: "Ubuntu", proficiency: 95, color: "#f97316", border: "#c2410c" },
];

export default function GravitySkills() {
    const sceneRef = useRef<HTMLDivElement>(null);
    const engineRef = useRef<Matter.Engine | null>(null);
    const [bodiesMap, setBodiesMap] = useState<Map<number, any>>(new Map());

    useEffect(() => {
        if (!sceneRef.current) return;

        const Engine = Matter.Engine,
            Runner = Matter.Runner,
            MouseConstraint = Matter.MouseConstraint,
            Mouse = Matter.Mouse,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Body = Matter.Body,
            Events = Matter.Events;

        const engine = Engine.create();
        engineRef.current = engine;

        // Zero background gravity, rely on manual central attraction
        engine.gravity.y = 0;
        engine.gravity.x = 0;

        const width = sceneRef.current.clientWidth;
        const height = sceneRef.current.clientHeight;

        // Boundary walls to keep nodes in view
        const wallOptions = {
            isStatic: true,
            render: { visible: false },
            restitution: 0.9
        };

        World.add(engine.world, [
            Bodies.rectangle(width / 2, -50, width, 100, wallOptions),
            Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions),
            Bodies.rectangle(-50, height / 2, 100, height, wallOptions),
            Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions)
        ]);

        // Create planetary skill bodies
        const skillBodies = skillsData.map((skill) => {
            const radius = skill.proficiency * 0.85;
            const x = Math.random() * width;
            const y = Math.random() * height;

            const body = Bodies.circle(x, y, radius, {
                restitution: 0.8,
                frictionAir: 0.05,
                density: skill.proficiency * 0.001,
                render: { visible: false },
                plugin: { item: skill, radius } // Custom payload
            });
            return body;
        });

        World.add(engine.world, skillBodies);

        // Mouse interaction for grabbing planets
        const mouse = Mouse.create(sceneRef.current);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        World.add(engine.world, mouseConstraint);

        // Orbit simulation physics loop
        Events.on(engine, 'beforeUpdate', () => {
            skillBodies.forEach((body) => {
                const cx = width / 2;
                const cy = height / 2;
                const dx = cx - body.position.x;
                const dy = cy - body.position.y;

                // Tangential acceleration
                const forceMagnitude = 0.000003 * body.mass;
                const tangentialForce = { x: -dy * forceMagnitude, y: dx * forceMagnitude };

                // Radial attraction
                const attractionMagnitude = 0.000005 * body.mass;
                const attractionForce = { x: dx * attractionMagnitude, y: dy * attractionMagnitude };

                Body.applyForce(body, body.position, {
                    x: tangentialForce.x + attractionForce.x,
                    y: tangentialForce.y + attractionForce.y
                });
            });

            // Update React state representing DOM chips
            setBodiesMap(new Map(skillBodies.map(b => [
                b.id,
                {
                    x: b.position.x,
                    y: b.position.y,
                    angle: b.angle,
                    item: b.plugin.item,
                    radius: b.plugin.radius
                }
            ])));
        });

        const runner = Runner.create();
        Runner.run(runner, engine);

        return () => {
            Runner.stop(runner);
            Engine.clear(engine);
            if (engine.world) {
                World.clear(engine.world, false);
            }
        };
    }, []);

    return (
        <div ref={sceneRef} className="w-full h-[600px] relative overflow-hidden rounded-3xl glass-panel border border-chrome-900 shadow-2xl">
            {Array.from(bodiesMap.values()).map((bodyData, idx) => (
                <motion.div
                    key={idx}
                    className="absolute flex items-center justify-center font-mono font-bold text-sm tracking-wider cursor-pointer select-none"
                    style={{
                        left: `${bodyData.x}px`,
                        top: `${bodyData.y}px`,
                        width: `${bodyData.radius * 2}px`,
                        height: `${bodyData.radius * 2}px`,
                        marginLeft: `-${bodyData.radius}px`,
                        marginTop: `-${bodyData.radius}px`,
                        transform: `rotate(${bodyData.angle}rad)`,
                        borderRadius: "50%",
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        border: `2px solid ${bodyData.item.border}`,
                        color: bodyData.item.color,
                        boxShadow: `0 0 30px ${bodyData.item.color}30`,
                    }}
                    whileHover={{ scale: 1.1, zIndex: 50, boxShadow: `0 0 50px ${bodyData.item.color}80` }}
                    data-magnetic="true"
                >
                    {bodyData.item.name}
                </motion.div>
            ))}
            <div className="absolute bottom-6 left-6 text-chrome-500 font-mono text-xs opacity-70 tracking-widest uppercase">
        // Drag core modules to destabilize orbit
            </div>
        </div>
    );
}
