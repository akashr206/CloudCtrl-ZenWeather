"use client";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import UserActions from "./UserActions";
import { Input } from "./ui/input";
import { Search } from "lucide-react";

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
            setMenuHeight(menuRef.current.scrollHeight);
        }
    }, [isOpen]);

    return (
        <header className={cn("fixed top-0 py-4 z-90  w-screen px-4 ")}>
            <motion.nav
                animate={{
                    border: isOpen ? 0 : 4,
                    height: isOpen ? 56 + menuHeight : 14 * 4,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={cn(
                    "w-full rounded-full bg-background/70 backdrop-blur-lg h-14  mx-auto  flex flex-col justify-center px-5 max-w-4xl border"
                )}
            >
                <div className="w-full flex justify-between items-center">
                    <p>Zen Weather</p>
                    <div className="flex items-center gap-2 relative">
                        <div className="relative">
                            <Input
                                placeholder="Search the city"
                                className={"w-60"}
                            ></Input>
                            <button
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <Search size={20} />
                            </button>
                        </div>
                        <div className="flex gap-2">
                            <ThemeToggle></ThemeToggle>
                            <UserActions></UserActions>
                        </div>
                    </div>
                </div>
            </motion.nav>
        </header>
    );
};

export default Navbar;
