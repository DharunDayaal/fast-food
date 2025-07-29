import CustomizationSection from "@/components/CustomizationSection";
import DeliverySection from "@/components/DeliverySection";
import Header from "@/components/Header";
import NutrientComponent from "@/components/NutrientComponent";
import Rating from "@/components/Rating";
import { appWriteConfig, getMenuItemDetails } from "@/lib/appwrite";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

interface Category {
    name: string;
    description: string;
    $id: string;
    $sequence: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
}

interface MenuItem {
    name: string;
    description: string;
    rating: number;
    calories: number;
    protein: number;
    price: number;
    image_url: string;
    $id: string;
    $sequence: string;
    $createdAt: string;
    $updatedAt: string;
    $permissions: string[];
    $databaseId: string;
    $collectionId: string;
    categories: Category;
    menuCustomizations: MenuCustomization[];
}

const MenuDetailsPage = () => {
    const { id } = useLocalSearchParams();

    const [menuData, setMenuData] = useState<MenuItem | null>(null);

    useEffect(() => {
        const fetchMenuData = async (id: string) => {
            try {
                if (!id) return;
                const response = await getMenuItemDetails(id);
                console.log(JSON.stringify(response, null, 2));
                setMenuData(response as MenuItem);
            } catch (error) {
                throw new Error(error as string);
            }
        };

        fetchMenuData(id as string);
    }, [id]);

    if (!menuData) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <Text>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 pl-4 pr-1">
            <View className="flex-row justify-between pr-3">
                <Header />
            </View>
            <View className="flex-row justify-between">
                <View className="flex-col gap-y-4">
                    <Text className="h3-bold font-extrabold">
                        {menuData.name}
                    </Text>
                    <Text className="paragraph-semibold text-gray-400">
                        {menuData.categories.name}
                    </Text>
                    <Rating rating={menuData.rating} />
                    <Text className="paragraph-bold text-xl font-extrabold">
                        <Text className="text-primary paragraph-bold text-xl font-extrabold">
                            $
                        </Text>
                        {menuData.price}
                    </Text>
                    <View className="flex-row gap-x-12">
                        <NutrientComponent
                            title="Calories"
                            value={menuData.calories}
                            subDomain="Cal"
                        />
                        <NutrientComponent
                            title="Protein"
                            value={menuData.protein}
                            subDomain="g"
                        />
                    </View>
                    <View className="flex-col gap-y-2">
                        <Text className="text-gray-400 font-quicksand-light">
                            Bun Type
                        </Text>
                        <Text className="paragraph-bold">Wheat</Text>
                    </View>
                </View>
                <Image
                    source={{
                        uri: `${menuData.image_url}?project=${appWriteConfig.projectId}`,
                    }}
                    className="size-64"
                    resizeMode="cover"
                />
            </View>
            <DeliverySection rating={menuData.rating} />
            <Text className="font-quicksand-light text-lg text-gray-200 p-2">
                {menuData.description}
            </Text>
            <Text className="font-quicksand-bold font-extrabold text-lg mb-3 mt-4">
                Customizations
            </Text>
            <CustomizationSection data={menuData.menuCustomizations} />
        </SafeAreaView>
    );
};

export default MenuDetailsPage;
