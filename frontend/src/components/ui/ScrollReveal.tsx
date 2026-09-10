import React, { useEffect, useRef, useState, ReactNode } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    animation?: string; // Tailwind classes for the hidden state (e.g. translate-y-10 opacity-0)
    delay?: number; // Delay in milliseconds
    duration?: string; // Tailwind duration class like duration-1000
    className?: string; // Additional classes
}

export const ScrollReveal = ({
    children,
    animation = 'translate-y-16 opacity-0',
    delay = 0,
    duration = 'duration-[800ms]',
    className = ''
}: ScrollRevealProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Single reveal: unobserve after showing once
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.15,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all ${duration} cubic-bezier-out ${isVisible ? 'translate-y-0 translate-x-0 opacity-100 scale-100' : animation} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};
