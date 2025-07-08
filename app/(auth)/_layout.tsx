import { Slot } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function _Layout() {
    return (
        <SafeAreaView>
            <Text>Auth _Layout</Text>
            <Slot />
        </SafeAreaView>
    );
}
