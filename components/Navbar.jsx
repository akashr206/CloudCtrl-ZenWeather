"use client";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
const Navbar = () => {
    const navs = [
        { title: "Home", link: "/home" },
        { title: "Products", link: "/products" },
        { title: "About", link: "/about" },
        { title: "Contact", link: "/contact" },
    ];
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="fixed top-0 my-4 w-screen px-4">
            <nav
                className={cn(
                    "max-w-6xl w-full bg-background/60 backdrop-blur-lg mx-auto h-13 flex items-center px-3 transition-all justify-between",
                    isOpen ? "rounded-t-lg" : "rounded-full border"
                )}
            >
                <div className="ml-5">Logo</div>
                <nav>
                    <ul className="flex gap-5 max-md:hidden">
                        {navs.map((nav, ind) => (
                            <li
                                key={ind}
                                className="opacity-85 hover:font-semibold hover:opacity-100 transition-all"
                            >
                                <Link href={nav.link}>{nav.title}</Link>
                            </li>
                        ))}
                    </ul>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-background/95 md:hidden absolute top-[52px] w-full left-0 p-4 border border-t-0 rounded-b-lg"
                        >
                            <ul className="flex flex-col gap-2">
                                {navs.map((nav, ind) => (
                                    <motion.li
                                        key={ind}
                                        initial={{ x: -30, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ease : "linear", delay: ind * 0.05}}
                                        className="opacity-85 hover:font-semibold hover:opacity-100 "
                                    >
                                        <Link href={nav.link}>{nav.title}</Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </nav>
                <div className="flex items-center max-md:mr-3 justify-center">
                    <ThemeToggle></ThemeToggle>
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="md:hidden"
                    >
                        <motion.div
                            style={{ rotate: isOpen ? 45 : 0 }}
                            className="w-[18px] transition-all h-[1.5px] rounded-full bg-foreground"
                        ></motion.div>
                        <motion.div
                            style={{
                                rotate: isOpen ? -45 : 0,
                                width: isOpen ? 18 : 14,
                                marginTop: isOpen ? -1 : 4,
                            }}
                            className="w-[14px] ml-auto transition-all h-[1.5px] rounded-full bg-foreground"
                        ></motion.div>
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
