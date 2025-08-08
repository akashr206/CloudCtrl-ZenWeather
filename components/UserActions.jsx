"use client";
import {
    SignedIn,
    SignInButton,
    UserButton,
    SignedOut,
    ClerkLoading,
    ClerkLoaded,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { dark, base } from "@clerk/themes";
const UserActions = () => {
    const { theme } = useTheme();

    return (
        <>
            <ClerkLoaded>
                <SignedIn>
                    <UserButton
                        appearance={{ baseTheme: theme === "dark" ? dark : base }}
                    ></UserButton>
                </SignedIn>
                <SignedOut>
                    <Button className={"rounded-full"}>
                        <SignInButton></SignInButton>
                    </Button>
                </SignedOut>
            </ClerkLoaded>
        </>
    );
};

export default UserActions;
