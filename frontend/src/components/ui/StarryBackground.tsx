import React, { useMemo } from 'react';

export const StarryBackground = () => {
    const particles = useMemo(() => {
        return Array.from({ length: 60 }).map((_, i) => ({
            id: i,
            size: Math.random() * 3 + 1.5, // 1.5px to 4.5px
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 20 + 20}s`, // 20s to 40s (super slow drifting)
            pulseDelay: `${Math.random() * 5}s`,
            pulseDuration: `${Math.random() * 3 + 2}s`, // 2s to 5s pulsing
        }));
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
            {/* Soft global gradients for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-brand-50/50 via-white to-slate-100 dark:from-slate-950 dark:via-brand-950/20 dark:to-slate-900 transition-colors duration-500"></div>

            {/* The Twinkling Drifting Particles / Dust */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute"
                    style={{
                        left: particle.left,
                        top: particle.top,
                        // Drift animation (makes them wander organically)
                        animation: `blob ${particle.animationDuration} ease-in-out infinite ${particle.animationDelay}`
                    }}
                >
                    <div
                        className="rounded-full bg-brand-500/80 dark:bg-white shadow-[0_0_12px_rgba(59,130,246,0.5)] dark:shadow-[0_0_10px_rgba(255,255,255,0.8)] opacity-60 dark:opacity-40"
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            // Pulse animation (makes them twinkle)
                            animation: `pulse ${particle.pulseDuration} cubic-bezier(0.4, 0, 0.6, 1) infinite ${particle.pulseDelay}`
                        }}
                    ></div>
                </div>
            ))}

            {/* Very calm, minimal glowing atmosphere (Nebula effect) */}
            <div className="absolute top-0 -left-20 w-[40rem] h-[40rem] bg-brand-200/20 dark:bg-brand-600/10 rounded-full filter blur-[120px] animate-blob transition-colors duration-1000"></div>
            <div className="absolute bottom-0 -right-20 w-[40rem] h-[40rem] bg-purple-200/20 dark:bg-purple-600/10 rounded-full filter blur-[120px] animate-blob animation-delay-4000 transition-colors duration-1000"></div>
        </div>
    );
};
