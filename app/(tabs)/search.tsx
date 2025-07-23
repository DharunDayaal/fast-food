import CartButton from "@/components/CartButton";
import Filter from "@/components/Filter";
import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";
import { images } from "@/constants";
import useAppwrite from "@/hooks/useAppWrite";
import { getCategories, getMenu } from "@/lib/appwrite";
import { Category, MenuItem } from "@/type";
import clsx from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotFoundComponent = () => {
    return (
        <View className="items-center justify-center flex-col gap-y-3">
            <Image source={images.searchNotFound} resizeMode="cover" />
            <Text className="paragraph-bold">Nothing matched your search</Text>
            <Text className="text-gray-300">Try a different search term or check for typos.</Text>
        </View>
    );
};

export default function Search() {
    const { category, query } = useLocalSearchParams<{
        query: string;
        category: string;
    }>();

    const { data, refetch, loading } = useAppwrite({
        fn: getMenu,
        params: {
            category: "",
            query: "",
            limit: 6,
        },
    });

    const { data: categories } = useAppwrite({
        fn: getCategories,
    });

    useEffect(() => {
        refetch({ category, query, limit: 6 });
    }, [category, query]);

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={data}
                renderItem={({ item, index }) => {
                    const isFirstRightColItem = index % 2 === 0;
                    return (
                        <View
                            className={clsx(
                                "flex-1 max-w-[48%]",
                                !isFirstRightColItem ? "mt-10" : "mt-0"
                            )}
                        >
                            <MenuCard item={item as MenuItem} />
                        </View>
                    );
                }}
                keyExtractor={(item) => item.$id}
                numColumns={2}
                columnWrapperClassName="gap-7"
                contentContainerClassName="gap-7 px-5 pb-32"
                ListHeaderComponent={() => (
                    <View className="mt-5 gap-5">
                        <View className="flex-between flex-row w-full">
                            <View className="flex-start">
                                <Text className="small-bold uppercase text-primary">
                                    Search
                                </Text>
                                <View className="flex-start flex-row gap-x-1 mt-0.5">
                                    <Text className="text-base font-quicksand-semibold text-dark-100 font-bold">
                                        Find your favorite food
                                    </Text>
                                </View>
                            </View>
                            <CartButton />
                        </View>
                        <SearchBar />
                        <Filter categories={categories as Category[]} />
                    </View>
                )}
                ListEmptyComponent={() => !loading && <NotFoundComponent />}
            />
        </SafeAreaView>
    );
}
