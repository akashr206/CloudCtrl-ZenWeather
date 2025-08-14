"use client";
import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef } from "react";

const LenisContext = createContext(null);

const LenisProvider = ({ children }) => {
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

    return (
        <LenisContext.Provider value={lenisRef}>
            <main className="pt-[80px]">{children}</main>
        </LenisContext.Provider>
    );
};
export const useLenisInstance = () => {
    const ctx = useContext(LenisContext);
    if (!ctx)
        throw new Error("useLenisInstance must be used inside LenisProvider");
    return ctx;
};

export default LenisProvider;
