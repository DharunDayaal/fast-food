import "./globals.css";
import { useFonts } from "expo-font"
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import useAuthStore from "@/store/authStore";



export default function RootLayout() {

    const { isLoading, fetchAuthenticatedUser } = useAuthStore();

    const [fontsLoaded, error] = useFonts(
        { 
            "QuickSand-Bold": require("@/assets/fonts/Quicksand-Bold.ttf"),
            "QuickSand-Medium": require("@/assets/fonts/Quicksand-Medium.ttf"),
            "Quicksand-Regular": require("@/assets/fonts/Quicksand-Regular.ttf"),
            "QuickSand-SemiBold": require("@/assets/fonts/Quicksand-SemiBold.ttf"),
            "Quicksand-Light": require("@/assets/fonts/Quicksand-Light.ttf")
        }
    )

    useEffect(() => {
        if(error) throw error;
        if(fontsLoaded) SplashScreen.hideAsync()
    }, [fontsLoaded, error])

    useEffect(() => {
        fetchAuthenticatedUser()
    }, [])

    if(!fontsLoaded || isLoading) return null

    return (
        <Stack screenOptions={{ headerShown: false }} />
    );
}