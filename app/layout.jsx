import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import { LocationProvider } from "@/hooks/useLocation";
import { Toaster } from "sonner";
import { WeatherProvider } from "@/hooks/useWeather";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "Team Arise",
    description: "Team Arise's Codefury project",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <ThemeProvider attribute={"class"}>
                        <SmoothScroll>
                            <LocationProvider>
                                <WeatherProvider>
                                    <Toaster richColors />
                                    <Navbar></Navbar>
                                    {children}
                                </WeatherProvider>
                            </LocationProvider>
                        </SmoothScroll>
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
