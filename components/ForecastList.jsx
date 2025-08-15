"use client";
import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
} from "recharts";

import { motion, AnimatePresence } from "framer-motion";
import { WeatherIcon } from "./Home";

const ForecastList = ({ weeklyForecast }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            x: -30,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 0.8,
            },
        },
        hover: {
            scale: 1.02,
            y: -2,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 20,
            },
        },
        tap: {
            scale: 0.98,
        },
    };

    const iconVariants = {
        initial: { rotate: 0, scale: 1 },
        hover: {
            rotate: [0, 5, -5, 0],
            scale: 1.1,
            transition: {
                rotate: {
                    duration: 0.4,
                    ease: "easeInOut",
                },
                scale: {
                    duration: 0.2,
                    ease: "easeOut",
                },
            },
        },
    };

    const temperatureVariants = {
        initial: { opacity: 1 },
        hover: {
            opacity: [1, 0.7, 1],
            transition: {
                duration: 0.6,
                ease: "easeInOut",
            },
        },
    };

    const backgroundVariants = {
        initial: {
            background: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        },
        hover: {
            background: "rgba(255, 255, 255, 0.15)",
            boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.15)",
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
    };
    console.log(weeklyForecast);
    const data = weeklyForecast.map((item) => ({
        name: item.day,
        high: item.high,
        low: item.low,
    }));
    
    return (
        <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            <motion.h2
                initial={{ opacity: 0, y: -15, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1,
                }}
                className="text-xl font-semibold tracking-wide"
            >
                Future Forecast
            </motion.h2>

            <AnimatePresence>
                <motion.div
                    className="flex flex-col gap-3"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {weeklyForecast?.map((item, i) => (
                        <motion.div
                            key={item.day}
                            variants={itemVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="group border border-border shadow-sm relative overflow-hidden rounded-xl px-5 py-3 cursor-pointer"
                            style={{
                                background: "rgba(255, 255, 255, 0.1)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 rounded-xl"
                                variants={backgroundVariants}
                                initial="initial"
                                whileHover="hover"
                            />

                            <motion.div
                                className="relative flex justify-between items-center"
                                layout
                            >
                                <motion.span
                                    className="font-medium text-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 + 0.2 }}
                                >
                                    {item.day}
                                </motion.span>

                                <motion.div
                                    variants={iconVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    className="flex items-center justify-center"
                                >
                                    <WeatherIcon
                                        condition={item.condition}
                                        size={32}
                                    />
                                </motion.div>

                                <motion.span
                                    variants={temperatureVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    className="font-semibold text-lg"
                                >
                                    <motion.span
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 + 0.3 }}
                                    >
                                        {item.high}°
                                    </motion.span>
                                    <span className="text-white/70 mx-1">
                                        /
                                    </span>
                                    <motion.span
                                        initial={{ opacity: 0, x: 10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 + 0.35 }}
                                        className="text-white/80"
                                    >
                                        {item.low}°
                                    </motion.span>
                                </motion.span>
                            </motion.div>

                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                                initial={{ x: "-100%" }}
                                whileHover={{
                                    x: "100%",
                                    transition: {
                                        duration: 0.8,
                                        ease: "easeInOut",
                                    },
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </AnimatePresence>
            <div className="w-full bg-white/20 border-white/30 shadow-sm backdrop-blur-lg rounded-xl py-5 h-[300px] pr-10" >
                <ResponsiveContainer>
                    <LineChart
                        data={data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="low" stroke="#8884d8" />
                        <Line type="monotone" dataKey="high" stroke="#82ca9d" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default ForecastList;
