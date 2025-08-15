import { useMemo } from "react";
import { Wind, Leaf, Factory, Gauge, MapPin, Timer } from "lucide-react";
import { motion } from "framer-motion";

function classNames(...cls) {
    return cls.filter(Boolean).join(" ");
}

const AQI_SCALE = [
    {
        max: 50,
        label: "Good",
        color: "from-emerald-400 to-emerald-600",
        ring: "ring-emerald-400/60",
    },
    {
        max: 100,
        label: "Satisfactory",
        color: "from-lime-400 to-lime-600",
        ring: "ring-lime-400/60",
    },
    {
        max: 200,
        label: "Moderate",
        color: "from-amber-400 to-amber-600",
        ring: "ring-amber-400/60",
    },
    {
        max: 300,
        label: "Poor",
        color: "from-orange-400 to-orange-600",
        ring: "ring-orange-400/60",
    },
    {
        max: 400,
        label: "Very Poor",
        color: "from-red-400 to-red-600",
        ring: "ring-red-400/60",
    },
    {
        max: 500,
        label: "Severe",
        color: "from-fuchsia-500 to-rose-600",
        ring: "ring-rose-400/60",
    },
];

function useAQIInfo(aqi) {
    return useMemo(() => {
        const info =
            AQI_SCALE.find((s) => aqi <= s.max) ||
            AQI_SCALE[AQI_SCALE.length - 1];
        return info;
    }, [aqi]);
}

function Meter({ value = 0 }) {
    const pct = Math.max(0, Math.min(100, (value / 500) * 100));
    return (
        <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="absolute inset-y-0 left-0 rounded-full bg-white/60 backdrop-blur-[1px]"
            />
        </div>
    );
}

function StatChip({ icon: Icon, label, value, unit }) {
    return (
        <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground/90 backdrop-blur-md transition hover:bg-white/10">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10">
                <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
                <div className="truncate text-xs text-foreground/70">{label}</div>
                <div className="flex items-baseline gap-1">
                    <span className="text-base font-semibold">{value}</span>
                    {unit ? (
                        <span className="text-xs text-foreground/60">{unit}</span>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

function GlowBlob({ gradient }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={classNames(
                "pointer-events-none absolute -top-24 -right-28 h-72 w-72 rounded-full blur-3xl",
                `bg-gradient-to-br ${gradient}`
            )}
            style={{ filter: "blur(64px) saturate(1.2)" }}
        />
    );
}

function CategoryPill({ label }) {
    const iconMap = {
        Good: Leaf,
        Satisfactory: Leaf,
        Moderate: Gauge,
        Poor: Factory,
        "Very Poor": Factory,
        Severe: Factory,
    };
    const Icon = iconMap[label] || Gauge;
    return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-foreground/90 backdrop-blur">
            <Icon className="h-3.5 w-3.5" />
            {label}
        </span>
    );
}

export default function AirQualityCard({ wind, data }) {
    const aqi = data ? data["us-epa-index"] : 0;
    const info = useAQIInfo(aqi);
    console.log(data);

    return (
        <>
            <div>
                <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-5 text-foreground shadow-2xl backdrop-blur-xl">
                    <GlowBlob gradient={info.color} />
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="relative z-10"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <div className="text-xs uppercase tracking-wide text-accent-foreground/60">
                                Air Quality Index
                            </div>
                            <CategoryPill label={info.label} />
                        </div>

                        <div className="mb-5 grid grid-cols-3 items-end gap-4 sm:grid-cols-4">
                            <div className="col-span-2 sm:col-span-2">
                                <div className="flex items-end gap-3">
                                    <div className="text-6xl font-extrabold leading-none drop-shadow">
                                        {aqi}
                                    </div>
                                    <div className="pb-2 text-sm text-accent-foreground">
                                        / 500
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <Meter value={aqi} />
                                </div>
                                <div className="mt-2 text-sm text-foreground/80">
                                    Dominant pollutant:{" "}
                                    <span className="font-medium text-foreground">
                                        PM2.5
                                    </span>
                                </div>
                            </div>

                            <div className="col-span-1 hidden sm:block">
                                <div className="flex h-full flex-col justify-end">
                                    <div className="mb-1 text-xs text-foreground/60">
                                        Wind
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/10">
                                            <Wind className="h-4 w-4" />
                                        </div>
                                        <div className="text-base font-semibold">
                                            {wind}
                                            <span className="ml-1 text-xs text-foreground/70">
                                                km/h
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <StatChip
                                icon={Leaf}
                                label="PM2.5"
                                value={data.pm2_5}
                                unit="µg/m³"
                            />
                            <StatChip
                                icon={Leaf}
                                label="PM10"
                                value={data.pm10}
                                unit="µg/m³"
                            />
                            <StatChip
                                icon={Factory}
                                label="NO₂"
                                value={data.no2}
                                unit="ppb"
                            />
                            <StatChip
                                icon={Factory}
                                label="O₃"
                                value={data.o3}
                                unit="ppb"
                            />
                            <StatChip
                                icon={Factory}
                                label="SO₂"
                                value={data.so2}
                                unit="ppb"
                            />
                            <StatChip
                                icon={Factory}
                                label="CO"
                                value={data.co}
                                unit="ppb"
                            />
                        </div>
                    </motion.div>

                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
                    <div
                        className={classNames(
                            "pointer-events-none absolute inset-0 rounded-2xl",
                            info.ring
                        )}
                    />
                    <div className="pointer-events-none absolute -left-10 top-0 h-40 w-72 -rotate-12 rounded-3xl bg-white/20 opacity-10 blur-2xl" />
                </div>
            </div>
        </>
    );
}
