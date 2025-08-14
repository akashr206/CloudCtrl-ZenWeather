"use client";
import ThemeToggle from "./ThemeToggle";
import { cn } from "@/lib/utils";
import SettingsDialog from "./Settings";
import LocationDialog from "./LocationDialog";
const Navbar = () => {
    return (
        <header className={cn("fixed top-0 py-4 z-90  w-screen px-4 ")}>
            <nav
                className={cn(
                    "w-full rounded-full bg-background/70 backdrop-blur-lg h-14  mx-auto  flex flex-col justify-center px-5 max-w-4xl border"
                )}
            >
                <div className="w-full flex justify-between items-center">
                    <p>Zen Weather</p>
                    <div className="flex items-center relative">
                        <ThemeToggle></ThemeToggle>
                        <LocationDialog></LocationDialog>
                        <SettingsDialog></SettingsDialog>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
