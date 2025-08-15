"use client";
import { useWeather } from "@/hooks/useWeather";
import ZLoader from "@/components/Loader";
import Home from "@/components/Home";
import { useState, useEffect } from "react";
import { useLocation } from "@/hooks/useLocation";
import ZInitial from "@/components/ZInitial";
import Orb from "@/components/background/Orb/Orb";

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
            <div className="opacity-60 ">
                <Orb></Orb>
            </div>
            <Home />
        </div>
    );
}
