"use client";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
            <motion.nav
                animate={{
                    border: isOpen ? 0 : 4,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                    "max-w-6xl w-full rounded-full bg-background/60 backdrop-blur-lg mx-auto h-13 flex items-center px-3 justify-between border",
                    isOpen && "rounded-b-none rounded-t-3xl"
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
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    borderTopLeftRadius: 40,
                                    borderTopRightRadius: 40,
                                }}
                                exit={{
                                    opacity: 0,
                                    borderTopLeftRadius: 40,
                                    borderTopRightRadius: 40,
                                }}
                                animate={{
                                    opacity: 1,
                                    borderTopLeftRadius: 0,
                                    borderTopRightRadius: 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="bg-background/95 md:hidden absolute top-[52px] w-full left-0 p-4 border border-t-0 rounded-b-lg"
                            >
                                <ul className="flex flex-col gap-2">
                                    {navs.map((nav, ind) => (
                                        <motion.li
                                            key={ind}
                                            initial={{ x: -30, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{
                                                ease: "linear",
                                                duration: (ind + 1) * 0.1,
                                            }}
                                            className="opacity-85 hover:font-semibold hover:opacity-100 "
                                        >
                                            <Link href={nav.link}>
                                                {nav.title}
                                            </Link>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
                <div className="flex items-center max-md:mr-3 justify-center">
                    <ThemeToggle></ThemeToggle>
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="md:hidden"
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            className="w-[18px] h-[1.5px] rounded-full bg-foreground"
                        ></motion.div>
                        <motion.div
                            animate={{
                                rotate: isOpen ? -45 : 0,
                                width: isOpen ? 18 : 14,
                                marginTop: isOpen ? -1 : 4,
                            }}
                            className="w-[14px] ml-auto h-[1.5px] rounded-full bg-foreground"
                        ></motion.div>
                    </button>
                </div>
            </motion.nav>
        </header>
    );
};

export default Navbar;
