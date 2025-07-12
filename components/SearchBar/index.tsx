import { images } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";

const SearchBar = () => {
    const params = useLocalSearchParams<{ query?: string }>();

    const [query, setQuery] = useState(params.query);
    const [debouncedValue, setDebouncedValue] = useState("");

    const handleSearch = (text: string) => {
        setQuery(text);

        if (!text) router.setParams({ query: undefined });
    };

    //to fix debouncing and keypad hidden issue
    const handleSubmit = () => {
        if (!query?.trim()) {
            router.setParams({ query: query });
        }
    };

    return (
        <View className="searchbar">
            <TextInput
                className="flex-1 p-5"
                placeholder="Search for pizzaz, burgers..."
                value={query}
                onChangeText={handleSearch}
                onSubmitEditing={handleSubmit} // Only the searchbar works when the user clicks the search key in their keypad
                placeholderTextColor={"#A0A0A0"}
                returnKeyType="search" // returns search icon in the keypad
            />
            <TouchableOpacity
                className="pr-5"
                onPress={() => router.setParams({ query: query })}
            >
                <Image
                    source={images.search}
                    className="size-6"
                    resizeMode="contain"
                    tintColor={"#5D5F6D"}
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchBar;
