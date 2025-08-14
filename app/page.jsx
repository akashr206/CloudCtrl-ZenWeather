"use client";
import { useWeather } from "@/hooks/useWeather";
import ZLoader from "@/components/Loader";
import { motion } from "framer-motion";
import Home from "@/components/Home";
import { useState, useEffect } from "react";
import { useLocation } from "@/hooks/useLocation";

function ZInitial() {
    const theme =
        typeof window !== "undefined"
            ? localStorage.getItem("theme") || "dark"
            : "dark";
    return (
        <motion.div
            animate={{ opacity: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
            className="flex items-center z-[999] top-0 overflow-hidden absolute w-full justify-center h-screen bg-foreground backdrop-blur-lg"
        >
            <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: 80 }}
                transition={{
                    delay: 1.3,
                    duration: 2.5,
                    ease: "linear",
                }}
            >
                <svg
                    width="200"
                    height="200"
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke={theme === "dark" ? "black" : "white"}
                    strokeWidth="16"
                    strokeLinejoin="miter"
                    strokeLinecap="square"
                >
                    <motion.path
                        d="M 10 10 L 90 10 L 10 90 L 90 90"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1] }}
                        transition={{
                            duration: 1.3,
                            ease: "easeInOut",
                        }}
                    />
                </svg>
            </motion.div>
        </motion.div>
    );
}

export default function page() {
    const { loading } = useWeather();
    const [show, setShow] = useState(true);
    const { fetching } = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    if (show) return <ZInitial />;
    if (fetching) return <ZLoader text="Fetching Location"></ZLoader>;
    if (loading) return <ZLoader></ZLoader>;
    return (
        <div className="bg-background flex flex-wrap gap-4">
            <Home />
        </div>
    );
}
