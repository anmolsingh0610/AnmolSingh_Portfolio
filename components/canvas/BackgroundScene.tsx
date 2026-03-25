"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
// Placeholder node-network until custom shader/drei components are implemented
import { Stars } from "@react-three/drei";
import GyroscopeController from "./GyroscopeController";

export default function BackgroundScene() {
    return (
        <div className="fixed inset-0 top-0 left-0 w-full h-full -z-10 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <Suspense fallback={null}>
                    <GyroscopeController />
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#ea580c" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#64748b" />
                    {/* Initial void/space node-network simulation proxy */}
                    <Stars radius={100} depth={50} count={3000} factor={4} saturation={1} fade speed={1.5} />
                </Suspense>
            </Canvas>
        </div>
    );
}
