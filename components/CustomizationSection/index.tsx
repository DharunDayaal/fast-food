import { images } from "@/constants";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

interface Customization {
    name: string;
    price: number;
    type: string;
    $id: string;
    $sequence: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
}

interface MenuCustomization {
    $id: string;
    $sequence: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    customizations: Customization;
    $databaseId: string;
    $collectionId: string;
}

interface CustomizationSectionProps {
    data: MenuCustomization[];
}

const CustomizationSection = ({ data }: CustomizationSectionProps) => {
    return (
        <View>
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 12,
                }}
                keyExtractor={(item) => item.customizations?.$id}
                renderItem={({ item }) => (
                    <View className="w-52 py-2 px-4 bg-[#3C2F2F] mr-2 flex h-14 items-center justify-between flex-row rounded-full">
                        <Text className="font-quicksand-bold text-white">
                            {item.customizations.name}
                        </Text>
                        <TouchableOpacity
                            className="flex items-center justify-center rounded-3xl bg-red-500 p-1"
                            onPress={() => {}}
                        >
                            <Image source={images.plus} className="size-5" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default CustomizationSection;
