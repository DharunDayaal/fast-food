import seed from "@/lib/seed";
import React from "react";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {

    const handleSeed = () => {
        console.log("Seed btn clicked");
        seed().catch((error) => console.log("Falied to seed the database", error))
    }
    return (
        <SafeAreaView>
            <Text>Search</Text>
            <Button title="seed" onPress={handleSeed} />
        </SafeAreaView>
    );
}
