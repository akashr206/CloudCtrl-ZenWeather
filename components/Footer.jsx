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
                className="pt-8 py-4 bg-white/10 backdrop-blur-sm border-t border-white/20 text-sm text-gray-200"
            >
                <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <Sun className="text-yellow-400" size={20} />
                        <span className="font-medium">Zen weather</span>
                    </div>

                    <div className="flex gap-4 text-gray-300">
                        Built with ❤️ by Akash
                    </div>

                    <p className="text-gray-400 text-xs">
                        © {new Date().getFullYear()} Zen weather
                    </p>
                </div>
            </motion.footer>
        </div>
    );
}
