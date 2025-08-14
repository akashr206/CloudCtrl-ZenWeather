"use client";
import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
    const [tempUnit, setTempUnit] = useState("celsius");
    const [windSpeedUnit, setWindSpeedUnit] = useState("kmh");
    const [pressureUnit, setPressureUnit] = useState("hPa");

    const value = {
        tempUnit,
        setTempUnit,
        windSpeedUnit,
        setWindSpeedUnit,
        pressureUnit,
        setPressureUnit,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
