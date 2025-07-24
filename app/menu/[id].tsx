import Header from "@/components/Header";
import { getMenuItemDetails } from "@/lib/appwrite";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export interface Customization {
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

export interface MenuCustomization {
  $id: string;
  $sequence: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  customizations: Customization;
  $databaseId: string;
  $collectionId: string;
}

export interface Category {
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

export interface MenuItem {
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
                console.log(JSON.stringify(response, null, 2))
                console.log(response.name)
                setMenuData(response as MenuItem);
            } catch (error) {
                throw new Error(error as string)
            }
        };

        fetchMenuData(id as string);
    }, [id]);

    return (
        <SafeAreaView className="flex-1 p-4">
            <View className="flex-row justify-between">
                <Header />
            </View>
            
        </SafeAreaView>
    );
};

export default MenuDetailsPage;
