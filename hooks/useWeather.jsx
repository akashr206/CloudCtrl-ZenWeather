"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { useLocation } from "./useLocation";

const weatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const { city } = useLocation();
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getWeather(q) {
        setLoading(true);
        console.log("city", city);

        try {
            const res = await fetch(`/api/weather?city=${q || city}`);
            const data = await res.json();
            setWeather(data);
        } catch (err) {
            toast.error("Failed to fetch weather");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (city) {
            getWeather(city);
        } else {
            setLoading(false);
        }
    }, [city]);

    return (
        <weatherContext.Provider value={{ weather, getWeather, loading }}>
            {children}
        </weatherContext.Provider>
    );
};

export const useWeather = () => useContext(weatherContext);
