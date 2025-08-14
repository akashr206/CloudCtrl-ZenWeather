"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
const locationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [city, setCity] = useState(null);
    const [fetching, setFetching] = useState(false);

    function getCurrentLocation() {
        if (typeof window === "undefined") return "";
        return localStorage.getItem("location") || "";
    }
    function saveLocation(city) {
        let allLocations = JSON.parse(localStorage.getItem("locations")) || [];
        allLocations.push(city);
        allLocations = [...new Set(allLocations)];
        localStorage.setItem("locations", JSON.stringify(allLocations));
        setCity(city);
    }

    function getLocations() {
        if (typeof window === "undefined") return "";
        return [
            ...new Set(JSON.parse(localStorage.getItem("locations")) || []),
        ];
    }

    function deleteLocation(city) {
        const allLocations = getLocations();
        const filteredLocations = allLocations.filter(
            (location) => location !== city
        );
        localStorage.setItem("locations", JSON.stringify(filteredLocations));
    }

    useEffect(() => {
        const localLocation = localStorage.getItem("location") || "";
        if (localLocation) setCity(localLocation);
        else if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setFetching(true);
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
                    setFetching(false);
                },
                (err) => {
                    const temp =
                        JSON.parse(localStorage.getItem("locations")) || [];

                    if (temp.length > 0) setCity(temp[0]);
                    else
                        toast.error(
                            "Permission denied. Please enter your location manually"
                        );
                    setFetching(false);
                }
            );
        } else {
            toast.error("No geo location found please enter the city manually");
            setFetching(false);
        }
    }, []);
    return (
        <locationContext.Provider
            value={{
                city,
                setCity,
                saveLocation,
                getLocations,
                deleteLocation,
                getCurrentLocation,
                fetching,
            }}
        >
            {children}
        </locationContext.Provider>
    );
};

export const useLocation = () => useContext(locationContext);
