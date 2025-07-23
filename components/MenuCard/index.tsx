import { appWriteConfig } from "@/lib/appwrite";
import { useCartStore } from "@/store/cartStore";
import { MenuItem } from "@/type";
import { Link } from "expo-router";
import React from "react";
import { Image, Platform, Text, TouchableOpacity } from "react-native";

const MenuCard = ({
    item: { image_url, name, price, rating, $id },
}: {
    item: MenuItem;
}) => {
    const imageUrl = `${image_url}?project=${appWriteConfig.projectId}`;

    const { addItem } = useCartStore();

    const handleGetItemDetails = async (id: string) => {
        console.log("Menu Id", id);
        // try {
        //     const response = await getMenuItemDetails(id);
        //     console.log("Menu Item Details", JSON.stringify(response, null, 2));
        // } catch (error) {
        //     throw new Error(error as string);
        // }
    };
    return (
        <Link href={`/menu/${$id}`} asChild>
            <TouchableOpacity
                className="menu-card"
                style={
                    Platform.OS === "android"
                        ? { elevation: 10, shadowColor: "#878787" }
                        : ""
                }
            >
                <Image
                    source={{ uri: imageUrl }}
                    className="size-32 absolute -top-10"
                    resizeMode="contain"
                />
                <Text className="text-center base-bold text-dark-100 mb-2">
                    {name}
                </Text>
                <Text className="body-regular text-gray-200 mb-4">
                    From ${price}
                </Text>
                <TouchableOpacity
                    onPress={() =>
                        addItem({
                            id: $id,
                            name,
                            price,
                            image_url: imageUrl,
                            customizations: [],
                        })
                    }
                >
                    <Text className="paragraph-bold text-primary">
                        Add to Cart +
                    </Text>
                </TouchableOpacity>
                <Text>{rating}</Text>
            </TouchableOpacity>
        </Link>
    );
};

export default MenuCard;
