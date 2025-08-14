"use client";
import { useState, useEffect, useRef } from "react";
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from "framer-motion";
import {
    Cloud,
    Sun,
    CloudRain,
    CloudSnow,
    CloudLightning,
    Wind,
    Droplets,
    Eye,
    Gauge,
    MapPin,
    RefreshCw,
    Zap,
    Snowflake,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useWeather } from "@/hooks/useWeather";

const WeatherParticle = ({ type, delay = 0 }) => {
    const x = useMotionValue(Math.random() * window.innerWidth);
    const y = useMotionValue(-50);

    const particleVariants = {
        rain: {
            y: [0, window.innerHeight + 100],
            x: [0, -50],
            transition: {
                duration: Math.random() * 2 + 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: delay,
                ease: "linear",
            },
        },
        snow: {
            y: [0, window.innerHeight + 100],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 360],
            transition: {
                duration: Math.random() * 4 + 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: delay,
                ease: "linear",
            },
        },
        lightning: {
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
            transition: {
                duration: 0.3,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: Math.random() * 3 + 2,
                delay: delay,
            },
        },
    };

    const ParticleIcon = () => {
        switch (type) {
            case "rain":
                return (
                    <div className="w-0.5 h-4 bg-blue-400 rounded-full opacity-60" />
                );
            case "snow":
                return <Snowflake size={8} className=" opacity-80" />;
            case "lightning":
                return <Zap size={16} className="text-yellow-300" />;
            default:
                return null;
        }
    };

    return (
        <motion.div
            className="absolute pointer-events-none z-10"
            style={{ x, y }}
            variants={particleVariants}
            animate={type}
            initial={{ opacity: 0 }}
        >
            <ParticleIcon />
        </motion.div>
    );
};

const WeatherBackground = ({ condition }) => {
    const backgroundVariants = {
        sunny: {
            background:
                "linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF6347 100%)",
            transition: { duration: 2 },
        },
        cloudy: {
            background:
                "linear-gradient(135deg, #87CEEB 0%, #708090 50%, #2F4F4F 100%)",
            transition: { duration: 2 },
        },
        rainy: {
            background:
                "linear-gradient(135deg, #4682B4 0%, #2F4F4F 50%, #191970 100%)",
            transition: { duration: 2 },
        },
        snowy: {
            background:
                "linear-gradient(135deg, #F0F8FF 0%, #E6E6FA 50%, #B0C4DE 100%)",
            transition: { duration: 2 },
        },
        stormy: {
            background:
                "linear-gradient(135deg, #2F2F2F 0%, #4B0082 50%, #000000 100%)",
            transition: { duration: 2 },
        },
    };

    return (
        <motion.div
            className="fixed inset-0 -z-10"
            variants={backgroundVariants}
            animate={condition || "sunny"}
            initial="sunny"
        />
    );
};

const FloatingClouds = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute opacity-20"
                    initial={{
                        x: -200,
                        y: Math.random() * 300 + 50,
                        scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                        x: window.innerWidth + 200,
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: Math.random() * 20 + 30,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 5,
                        ease: "linear",
                    }}
                >
                    <Cloud size={80 + Math.random() * 40} className="" />
                </motion.div>
            ))}
        </div>
    );
};

const parseWeatherData = (data) => {
    if (!data || !data.current || !data.location) return null;

    const { current, location, forecast } = data;

    const currentHour = new Date().getHours();
    const hourlyForecast =
        forecast?.forecastday?.[0]?.hour?.slice(currentHour)?.map((hour) => ({
            time: new Date(hour.time).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }),
            temp: Math.round(hour.temp_c),
            condition: getConditionType(hour.condition.code, hour.is_day),
        })) || [];

    const weeklyForecast =
        forecast?.forecastday?.slice(0, 5)?.map((day, index) => ({
            day:
                index === 0
                    ? "Today"
                    : new Date(day.date).toLocaleDateString("en-US", {
                          weekday: "long",
                      }),
            high: Math.round(day.day.maxtemp_c),
            low: Math.round(day.day.mintemp_c),
            condition: getConditionType(day.day.condition.code, 1),
        })) || [];

    return {
        location: `${location.name}, ${location.country}`,
        temperature: Math.round(current.temp_c),
        condition: current.condition.text,
        description: getWeatherDescription(current.condition.code),
        humidity: current.humidity,
        windSpeed: Math.round(current.wind_kph),
        visibility: current.vis_km,
        pressure: Math.round(current.pressure_mb),
        uvIndex: current.uv,
        feelsLike: Math.round(current.feelslike_c),
        currentCondition: getConditionType(
            current.condition.code,
            current.is_day
        ),
        hourlyForecast,
        weeklyForecast,
    };
};

const getConditionType = (code, isDay) => {
    const conditionMap = {
        1000: "sunny",
        1003: "cloudy",
        1006: "cloudy",
        1009: "cloudy",
        1030: "cloudy",
        1063: "rainy",
        1066: "snowy",
        1069: "rainy",
        1072: "rainy",
        1087: "stormy",
        1114: "snowy",
        1117: "snowy",
        1135: "cloudy",
        1147: "cloudy",
        1150: "rainy",
        1153: "rainy",
        1168: "rainy",
        1171: "rainy",
        1180: "rainy",
        1183: "rainy",
        1186: "rainy",
        1189: "rainy",
        1192: "rainy",
        1195: "rainy",
        1198: "rainy",
        1201: "rainy",
        1204: "rainy",
        1207: "rainy",
        1210: "snowy",
        1213: "snowy",
        1216: "snowy",
        1219: "snowy",
        1222: "snowy",
        1225: "snowy",
        1237: "snowy",
        1240: "rainy",
        1243: "rainy",
        1246: "rainy",
        1249: "rainy",
        1252: "rainy",
        1255: "snowy",
        1258: "snowy",
        1261: "snowy",
        1264: "snowy",
        1273: "stormy",
        1276: "stormy",
        1279: "stormy",
        1282: "stormy",
    };

    const condition = conditionMap[code] || "sunny";

    if (code === 1000 && !isDay) {
        return "cloudy";
    }

    return condition;
};

const getWeatherDescription = (code) => {
    const descriptions = {
        1000: "Clear skies and pleasant weather",
        1003: "A mix of sun and clouds",
        1006: "Cloudy with overcast skies",
        1009: "Completely overcast",
        1063: "Light rain possible",
        1087: "Thunderstorms possible",
        1180: "Light rain expected",
        1183: "Light rain throughout the day",
        1186: "Moderate rain at times",
        1189: "Steady moderate rain",
        1273: "Light rain with thunderstorms",
    };

    return descriptions[code] || "Weather conditions vary";
};

const WeatherIcon = ({ condition, size = 24, interactive = false }) => {
    const iconProps = { size, className: "text-slate-700" };

    const iconVariants = {
        hover: {
            scale: 1.2,
            rotate: [0, -10, 10, 0],
            transition: { duration: 0.5 },
        },
        tap: { scale: 0.9 },
    };

    const IconComponent = () => {
        switch (condition) {
            case "sunny":
                return (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 20,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    >
                        <Sun
                            {...iconProps}
                            className="text-yellow-400 drop-shadow-lg"
                        />
                    </motion.div>
                );
            case "cloudy":
                return (
                    <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        <Cloud
                            {...iconProps}
                            className="text-gray-400 drop-shadow-lg"
                        />
                    </motion.div>
                );
            case "rainy":
                return (
                    <motion.div
                        animate={{ y: [0, 2, 0] }}
                        transition={{
                            duration: 1.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        <CloudRain
                            {...iconProps}
                            className="text-blue-400 drop-shadow-lg"
                        />
                    </motion.div>
                );
            case "snowy":
                return (
                    <motion.div
                        animate={{
                            y: [0, -3, 0],
                            rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        <CloudSnow
                            {...iconProps}
                            className="text-blue-200 drop-shadow-lg"
                        />
                    </motion.div>
                );
            case "stormy":
                return (
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, -2, 2, 0],
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        <CloudLightning
                            {...iconProps}
                            className="text-purple-400 drop-shadow-lg"
                        />
                    </motion.div>
                );
            default:
                return (
                    <Sun
                        {...iconProps}
                        className="text-yellow-400 drop-shadow-lg"
                    />
                );
        }
    };

    if (interactive) {
        return (
            <motion.div
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className="cursor-pointer"
            >
                <IconComponent />
            </motion.div>
        );
    }

    return <IconComponent />;
};

const StatCard = ({
    icon: Icon,
    label,
    value,
    unit,
    delay,
    interactive = true,
}) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(0);
    const rotateY = useSpring(0);

    const handleMouseMove = (event) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateXValue = (event.clientY - centerY) / 10;
        const rotateYValue = (centerX - event.clientX) / 10;

        rotateX.set(rotateXValue);
        rotateY.set(rotateYValue);
    };

    const handleMouseLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
                delay,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
            }}
            whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.2 },
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="cursor-pointer"
        >
            <Card className="backdrop-blur-md bg-white/20 border-white/30 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-6">
                    <motion.div
                        className="flex items-center space-x-4"
                        style={{ transform: "translateZ(20px)" }}
                    >
                        <motion.div
                            className="p-3 rounded-xl bg-white/20 backdrop-blur-sm"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Icon size={24} className=" drop-shadow-lg" />
                        </motion.div>
                        <div>
                            <motion.p
                                className="text-sm /80 font-medium mb-1"
                                style={{ transform: "translateZ(10px)" }}
                            >
                                {label}
                            </motion.p>
                            <motion.p
                                className="text-2xl font-bold  drop-shadow-lg"
                                style={{ transform: "translateZ(15px)" }}
                            >
                                {value}
                                <span className="text-sm /70 ml-1">{unit}</span>
                            </motion.p>
                        </div>
                    </motion.div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const HourlyForecastCard = ({ hour, delay }) => (
    <motion.div
        initial={{ opacity: 0, x: -50, rotateY: -90 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{
            delay,
            duration: 0.6,
            type: "spring",
            stiffness: 100,
        }}
        whileHover={{
            scale: 1.1,
            y: -10,
            rotateY: 5,
            transition: { duration: 0.2 },
        }}
        className="flex-shrink-0 cursor-pointer"
    >
        <Card className="backdrop-blur-md bg-white/20 border-white/30 w-24 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-4 text-center">
                <motion.p
                    className="text-sm font-medium mb-3 /90"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + 0.2 }}
                >
                    {hour.time}
                </motion.p>
                <motion.div
                    className="flex justify-center mb-3"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        delay: delay + 0.3,
                        type: "spring",
                        stiffness: 200,
                    }}
                >
                    <WeatherIcon
                        condition={hour.condition}
                        size={28}
                        interactive
                    />
                </motion.div>
                <motion.p
                    className="text-lg font-bold  drop-shadow-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: delay + 0.4 }}
                >
                    {hour.temp}°
                </motion.p>
            </CardContent>
        </Card>
    </motion.div>
);

const Home = () => {
    const { weather: rawWeather, getWeather } = useWeather();
    const [refreshing, setRefreshing] = useState(false);
    const [particles, setParticles] = useState([]);

    const weather = rawWeather ? parseWeatherData(rawWeather) : null;

    useEffect(() => {
        if (!weather?.currentCondition) return;

        const particleCount = {
            rainy: 50,
            snowy: 30,
            stormy: 20,
        };

        const count = particleCount[weather.currentCondition] || 0;
        const newParticles = [];

        for (let i = 0; i < count; i++) {
            newParticles.push({
                id: i,
                type: weather.currentCondition,
                delay: Math.random() * 2,
            });
        }

        setParticles(newParticles);
    }, [weather?.currentCondition]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await getWeather("kashmir");
        setRefreshing(false);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 1,
                staggerChildren: 0.15,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
    };

    return (
        <div className="min-h-screen mx-auto relative overflow-hidden">
            <WeatherBackground condition={weather?.currentCondition} />
            <FloatingClouds />

            <AnimatePresence>
                {particles.map((particle) => (
                    <WeatherParticle
                        key={particle.id}
                        type={particle.type}
                        delay={particle.delay}
                    />
                ))}
            </AnimatePresence>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-20  max-w-4xl w-full mx-auto p-6 space-y-10"
            >
                <motion.div
                    variants={itemVariants}
                    className="text-center space-y-4 "
                >
                    <motion.div
                        className="flex items-center justify-center space-x-3"
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                            }}
                        >
                            <MapPin size={20} className=" drop-shadow-lg" />
                        </motion.div>
                        <span className="text-lg font-semibold  drop-shadow-lg">
                            {weather?.location || "Loading..."}
                        </span>
                    </motion.div>
                    <motion.h1
                        className="text-6xl font-light  drop-shadow-2xl"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 1,
                            type: "spring",
                            stiffness: 100,
                        }}
                    >
                        Weather
                    </motion.h1>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="backdrop-blur-xl  bg-white/10 border-white/20 shadow-2xl overflow-hidden">
                        <CardContent className="p-10 flex flex-row-reverse max-md:flex-col justify-around text-center relative">
                            <div className="absolute top-6 right-6">
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={handleRefresh}
                                    className="p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors duration-300"
                                >
                                    <motion.div
                                        animate={{
                                            rotate: refreshing ? 360 : 0,
                                        }}
                                        transition={{
                                            duration: 1,
                                            repeat: refreshing
                                                ? Number.POSITIVE_INFINITY
                                                : 0,
                                            ease: "linear",
                                        }}
                                    >
                                        <RefreshCw size={20} />
                                    </motion.div>
                                </motion.button>
                            </div>

                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    delay: 0.5,
                                    duration: 1,
                                    type: "spring",
                                    stiffness: 100,
                                }}
                                className="md:my-auto max-md:mx-auto"
                            >
                                <WeatherIcon
                                    condition={
                                        weather?.currentCondition || "sunny"
                                    }
                                    size={120}
                                    interactive
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                            >
                                <motion.h2
                                    className="text-8xl font-light mb-4  drop-shadow-2xl"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {weather?.temperature || "--"}°
                                </motion.h2>
                                <motion.p
                                    className="text-2xl font-medium /90 mb-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    {weather?.condition || "Loading..."}
                                </motion.p>
                                <motion.p
                                    className="/80 text-lg mb-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.2 }}
                                >
                                    {weather?.description ||
                                        "Fetching weather data..."}
                                </motion.p>
                                <motion.p
                                    className="/70"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 1.4 }}
                                >
                                    Feels like {weather?.feelsLike || "--"}°
                                </motion.p>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            icon={Droplets}
                            label="Humidity"
                            value={weather?.humidity || "--"}
                            unit="%"
                            delay={0.2}
                        />
                        <StatCard
                            icon={Wind}
                            label="Wind Speed"
                            value={weather?.windSpeed || "--"}
                            unit="km/h"
                            delay={0.3}
                        />
                        <StatCard
                            icon={Eye}
                            label="Visibility"
                            value={weather?.visibility || "--"}
                            unit="km"
                            delay={0.4}
                        />
                        <StatCard
                            icon={Gauge}
                            label="Pressure"
                            value={weather?.pressure || "--"}
                            unit="mb"
                            delay={0.5}
                        />
                    </div>
                </motion.div>
                <motion.div variants={itemVariants}>
                    <motion.h3
                        className="text-2xl font-semibold  drop-shadow-lg mb-6"
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        Today's Forecast
                    </motion.h3>
                    <div className="flex space-x-4 overflow-x-auto pb-4">
                        {weather?.hourlyForecast?.map((hour, index) => (
                            <HourlyForecastCard
                                key={hour.time}
                                hour={hour}
                                delay={0.1 * index}
                            />
                        )) ||
                            [...Array(6)].map((_, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    className="flex-shrink-0"
                                >
                                    <Card className="backdrop-blur-md bg-white/10 border-white/20 w-24">
                                        <CardContent className="p-4 text-center">
                                            <div className="h-16 flex items-center justify-center">
                                                <div className="animate-pulse bg-white/20 rounded w-12 h-12"></div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Home;
