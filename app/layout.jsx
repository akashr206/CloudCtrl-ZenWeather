import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import { LocationProvider } from "@/hooks/useLocation";
import { Toaster } from "sonner";
import { WeatherProvider } from "@/hooks/useWeather";
import { SettingsProvider } from "@/hooks/useSettings";
import AppFooter from "@/components/Footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Zen Weather",
    description: "An intuitive, smooth and interactive weather app.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <ThemeProvider attribute={"class"}>
                    <SmoothScroll>
                        <LocationProvider>
                            <WeatherProvider>
                                <SettingsProvider>
                                    <Toaster richColors />
                                    <Navbar></Navbar>
                                    {children}
                                    <AppFooter></AppFooter>
                                </SettingsProvider>
                            </WeatherProvider>
                        </LocationProvider>
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}
