"use client";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

const useLenis = () => {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        lenisRef.current = lenis;

        return () => {
            lenis.destroy();
        };
    }, []);

    return lenisRef;
};

const SmoothScroll = ({ children }) => {
    useLenis();

    return <main className="pt-[80px]">{children}</main>;
};

export default SmoothScroll;
