"use client";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import UserActions from "./UserActions";

const Navbar = () => {
    const navs = [
        { title: "Home", link: "/home" },
        { title: "Products", link: "/products" },
        { title: "About", link: "/about" },
        { title: "Contact", link: "/contact" },
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [menuHeight, setMenuHeight] = useState(0);
    const menuRef = useRef(null);

    useEffect(() => {
        if (menuRef.current) {
            console.log(menuRef.current.scrollHeight);

            setMenuHeight(menuRef.current.scrollHeight);
        }
    }, [isOpen]);

    return (
        <header
            className={cn(
                "fixed top-0 py-4 bg-background/60 backdrop-blur-lg w-screen px-4 "
            )}
        >
            <motion.nav
                animate={{
                    border: isOpen ? 0 : 4,
                    height: isOpen ? 56 + menuHeight : 14 * 4,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                    "w-full rounded-xl bg-background h-14  mx-auto  flex flex-col justify-center px-5 border"
                )}
            >
                <div className="w-full flex justify-between items-center">
                    <div>Logo</div>
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
                    </nav>
                    <div className="flex items-center gap-2 justify-center">
                        <ThemeToggle></ThemeToggle>
                        <div className="max-md:hidden">
                            <UserActions></UserActions>
                        </div>
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
                </div>
                <AnimatePresence>
                    <motion.div
                        ref={menuRef}
                        animate={{
                            height: isOpen ? menuHeight : 0,
                            opacity: isOpen ? 1 : 0,
                        }}
                        transition={{
                            height: {
                                duration: 0.3,
                                ease: "easeInOut",
                            },
                            opacity: {
                                duration: 0.3,
                                delay: isOpen ? 0.1 : 0,
                            },
                        }}
                        className="md:hidden w-full h-max "
                    >
                        <ul className="flex flex-col gap-2">
                            {isOpen &&
                                navs.map((nav, ind) => (
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
                                        <Link href={nav.link}>{nav.title}</Link>
                                    </motion.li>
                                ))}
                        </ul>
                    </motion.div>
                </AnimatePresence>
            </motion.nav>
        </header>
    );
};

export default Navbar;
