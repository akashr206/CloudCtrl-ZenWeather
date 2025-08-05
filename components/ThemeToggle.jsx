"use client";
import { Button } from "./ui/button";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    function getTheme() {
        return localStorage.getItem("theme");
    }

    function set() {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    }
    useEffect(() => {
        setTheme(getTheme());
        setMounted(true);
    }, [mounted]);

    return (
        <div>
            {mounted ? (
                <Button
                    className={"rounded-full"}
                    onClick={set}
                    variant={"ghost"}
                >
                    {" "}
                    {theme === "dark" ? <Moon /> : <Sun />}
                </Button>
            ) : (
                " "
            )}
        </div>
    );
};

export default ThemeToggle;
