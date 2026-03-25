"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { Suspense } from "react";

function DistortionPlane({ url }: { url: string }) {
    const mesh = useRef<THREE.Mesh>(null);
    const texture = useTexture(url);

    const uniforms = useRef({
        uTime: { value: 0 },
        uTexture: { value: texture },
        uHover: { value: 0.0 }
    });

    const time = useRef(0);

    useFrame((state, delta) => {
        if (mesh.current) {
            time.current += delta;
            uniforms.current.uTime.value = time.current;
            // Gently interpolate hover over time if needed, currently static distortion
        }
    });

    return (
        <mesh ref={mesh}
            onPointerOver={() => { gsap.to(uniforms.current.uHover, { value: 1.0, duration: 1 }) }}
            onPointerOut={() => { gsap.to(uniforms.current.uHover, { value: 0.0, duration: 1 }) }}>
            <planeGeometry args={[4, 5, 64, 64]} />
            <shaderMaterial
                uniforms={uniforms.current}
                vertexShader={`
          varying vec2 vUv;
          uniform float uTime;
          uniform float uHover;
          void main() {
            vUv = uv;
            vec3 pos = position;
            
            // Base fluid distortion
            float noiseX = sin(pos.x * 2.0 + uTime) * 0.1;
            float noiseY = cos(pos.y * 2.0 + uTime) * 0.1;
            
            // Hover intensifies the magnetic warp
            pos.z += mix(noiseX + noiseY, sin(pos.x * 5.0 + uTime) * 0.5, uHover);
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
                fragmentShader={`
          varying vec2 vUv;
          uniform sampler2D uTexture;
          void main() {
            vec4 color = texture2D(uTexture, vUv);
            // Slight color separation glitch effect
            vec4 colorR = texture2D(uTexture, vUv + vec2(0.01, 0.0));
            vec4 colorB = texture2D(uTexture, vUv - vec2(0.01, 0.0));
            
            gl_FragColor = vec4(colorR.r, color.g, colorB.b, color.a);
          }
        `}
            />
        </mesh>
    );
}

export default function DistortedImage({ src }: { src: string }) {
    return (
        <div className="w-full h-full absolute inset-0 rounded-2xl overflow-hidden glass-panel" data-magnetic="true">
            <Canvas camera={{ position: [0, 0, 4.5], fov: 75 }} gl={{ alpha: true }}>
                <Suspense fallback={null}>
                    <DistortionPlane url={src} />
                </Suspense>
            </Canvas>
        </div>
    );
}
