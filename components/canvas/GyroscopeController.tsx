"use client";

import { useEffect, useState } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function GyroscopeController() {
    const { camera } = useThree();
    const [targetRotation] = useState(() => new THREE.Vector2());

    useEffect(() => {
        const requestAccess = async () => {
            // @ts-ignore
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                try {
                    // @ts-ignore
                    const permissionState = await DeviceOrientationEvent.requestPermission();
                    if (permissionState !== 'granted') return;
                } catch (e) {
                    console.warn("Gyroscope permission denied");
                }
            }
        };

        const handleOrientation = (e: DeviceOrientationEvent) => {
            if (e.beta && e.gamma) {
                targetRotation.y = THREE.MathUtils.clamp(e.gamma * (Math.PI / 180) * 0.4, -0.4, 0.4);
                targetRotation.x = THREE.MathUtils.clamp((e.beta - 45) * (Math.PI / 180) * 0.4, -0.4, 0.4);
            }
        };

        window.addEventListener("deviceorientation", handleOrientation);
        window.addEventListener("click", requestAccess, { once: true });

        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
            window.removeEventListener("click", requestAccess);
        };
    }, [targetRotation]);

    useFrame(() => {
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRotation.y, 0.05);
        camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRotation.x, 0.05);
    });

    return null;
}
