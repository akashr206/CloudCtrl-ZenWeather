"use client";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTrigger,
    DialogTitle,
    DialogHeader,
} from "@/components/ui/dialog";
import { Trash, Search, LocateFixed, MapPin, Loader } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useLocation } from "@/hooks/useLocation";
import { Card } from "./ui/card";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useWeather } from "@/hooks/useWeather";

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

const LocationDialog = () => {
    const {
        getCurrentLocation,
        getLocations,
        saveLocation,
        deleteLocation,
        setCity,
    } = useLocation();
    const [locations, setLocations] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { loading, weather } = useWeather();
    const searchRef = useRef(null);

    useEffect(() => {
        if (locations.length === 0 && getCurrentLocation() === "")
            setIsEmpty(true);
        else setIsEmpty(false);
    }, [locations, getCurrentLocation]);

    useEffect(() => {
        setLocations(getLocations());
    }, [isOpen]);

    useEffect(() => {
        if (!loading && !weather) setIsOpen(true);
        else setIsOpen(false);
    }, [weather, loading]);

    const fetchSearchResults = useCallback(
        debounce(async (query) => {
            if (!query.trim()) {
                setSearchResults([]);
                return;
            }
            try {
                const res = await fetch(
                    `/api/search?q=${encodeURIComponent(query)}`
                );
                if (!res.ok) throw new Error("Search failed");
                const data = await res.json();
                setSearchResults(data.results || []);
            } catch (err) {
                console.error(err);
            }
        }, 500),
        []
    );

    useEffect(() => {
        fetchSearchResults(searchQuery);
    }, [searchQuery, fetchSearchResults]);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant={"ghost"}
                    className={"rounded-full"}
                    size={"icon"}
                >
                    <MapPin />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Locations</DialogTitle>
                    <DialogDescription>
                        Add a new location to your dashboard
                    </DialogDescription>
                </DialogHeader>

                <div className="relative">
                    <Input
                        ref={searchRef}
                        placeholder="Search the city"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2">
                        <Search size={20} />
                    </button>
                </div>

                <div
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                    className="h-[400px] overflow-y-auto relative space-y-2 mt-4"
                >
                    {isEmpty && (
                        <p className="text-xl text-center">
                            Please add a location
                        </p>
                    )}

                    {getCurrentLocation() && (
                        <Card
                            onClick={() => {
                                setCity(getCurrentLocation());
                                setIsOpen(false);
                            }}
                            className="p-4 cursor-pointer flex flex-row items-center gap-3"
                        >
                            <LocateFixed size={24} />
                            <div className="flex flex-col">
                                <h2 className="text-lg font-semibold">
                                    My Location
                                </h2>
                                <p>{getCurrentLocation()}</p>
                            </div>
                        </Card>
                    )}

                    {locations.map((location, idx) => (
                        <Card
                            key={idx}
                            className="p-4 flex flex-row items-center gap-3"
                        >
                            <MapPin size={24} />
                            <div
                                onClick={() => {
                                    setCity(location);
                                    setIsOpen(false);
                                }}
                                className="flex flex-col w-full cursor-pointer"
                            >
                                <h2 className="text-lg font-semibold">
                                    {location}
                                </h2>
                            </div>
                            <Button
                                onClick={() => {
                                    deleteLocation(location);
                                    setLocations(getLocations());
                                }}
                                variant={"ghost"}
                                className={"text-red-500 hover:text-red-600 "}
                            >
                                <Trash></Trash>
                            </Button>
                        </Card>
                    ))}
                    {searchQuery.length > 0 && (
                        <div className="absolute bg-background w-full h-full flex flex-col top-0 left-0 ">
                            {searchResults.length > 0 ? (
                                searchResults.map((city, idx) => (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.85 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        key={idx}
                                        onClick={() => {
                                            saveLocation(city.name);
                                            setIsOpen(false);
                                            setSearchQuery("");
                                        }}
                                        className="p-2 top-0 left-0 border-b w-full flex flex-col gap-1 cursor-pointer"
                                    >
                                        <div className="flex items-end gap-2">
                                            <h2 className="text-lg font-semibold">
                                                {city.name}
                                            </h2>
                                            <p>{city.country}</p>
                                        </div>
                                    </motion.button>
                                ))
                            ) : (
                                <div>
                                    <Loader className="mx-auto my-auto animate-spin"></Loader>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LocationDialog;
