"use client";

import { motion } from "framer-motion";
import { Sun, Cloud, CloudRain } from "lucide-react";

export default function AppFooter() {
    return (
        <div className="bg-background">
            <motion.footer
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 3}}
                className="pt-8 py-4 bg-white/10 backdrop-blur-sm border-t border-white/20 text-sm"
            >
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="logo" className="w-[30px] h-[30px] rounded-full" />
                        <p className="font-medium">Zen weather</p>
                    </div>

                    <div className="flex gap-4 ">
                        Built with ❤️ by Akash
                    </div>

                    <p className=" text-xs">
                        © {new Date().getFullYear()} Zen weather
                    </p>
                </div>
            </motion.footer>
        </div>
    );
}
