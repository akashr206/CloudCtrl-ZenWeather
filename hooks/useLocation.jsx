"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
const locationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [city, setCity] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const localLocation = localStorage.getItem("location") || "";
        if (localLocation) setCity(localLocation);
        else if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    try {
                        const res = await fetch(
                            `/api/location?lat=${latitude}&lon=${longitude}`
                        );
                        const data = await res.json();
                        const temp =
                            data.address.city ||
                            data.address.town ||
                            data.address.village ||
                            "Unknown";
                        setCity(temp);
                        localStorage.setItem("location", temp);
                        toast.success("Successfully fetched your city!");
                    } catch (err) {
                        toast.error("Failed to fetch your city, try again");
                    }
                },
                (err) => {
                    toast.error(err.message);
                }
            );
        } else {
            toast.error("No geo location found please enter the city manually");
        }
    }, []);
    return (
        <locationContext.Provider value={{ city }}>
            {children}
        </locationContext.Provider>
    );
};

export const useLocation = () => useContext(locationContext);
