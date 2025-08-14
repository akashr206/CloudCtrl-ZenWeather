"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
export default function ZLoader({ text = "The Zen Weather" }) {
    const { theme } = useTheme();
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex absolute w-full z-90 items-center gap-2 flex-col justify-center h-screen bg-background/70 backdrop-blur-lg"
            >
                <svg
                    width="30"
                    height="30"
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke={theme === "dark" ? "white" : "black"}
                    strokeWidth="16"
                    strokeLinejoin="miter"
                    strokeLinecap="square"
                >
                    <motion.path
                        d="M 10 10 L 90 10 L 10 90 L 90 90"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: [0, 1, 0] }}
                        transition={{
                            duration: 2,
                            ease: "easeInOut",
                            repeat: Infinity,
                        }}
                    />
                </svg>
                <p className="text-lg font-semibold">{text}</p>
            </motion.div>
        </AnimatePresence>
    );
}
