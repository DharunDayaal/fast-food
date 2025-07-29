import Button from "@/components/Button";
import CartItem from "@/components/CartItem";
import Header from "@/components/Header";
import { images } from "@/constants";
import { useCartStore } from "@/store/cartStore";
import { PaymentInfoStripeProps } from "@/type";
import clsx from "clsx";
import React from "react";
import { FlatList, Text, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentInfoStripe = ({
    label,
    value,
    labelStyle,
    valueStyle,
}: PaymentInfoStripeProps) => {
    return (
        <View className="flex-between flex-row my-1">
            <Text
                className={clsx("paragraph-medium text-gray-200", labelStyle)}
            >
                {label}
            </Text>
            <Text
                className={clsx("paragrao=ph-bold texxt-dark-100", valueStyle)}
            >
                {value}
            </Text>
        </View>
    );
};

export default function Cart() {
    const { items, getTotalItems, getTotalPrice } = useCartStore();

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();

    return (
        <SafeAreaView>
            <FlatList
                data={items}
                renderItem={({ item, index }) => {
                    return <CartItem item={item} key={index} />;
                }}
                keyExtractor={(item) => item.id}
                contentContainerClassName="pb-28 px-5 pt-5"
                ListHeaderComponent={() => <Header title="Your Cart" />}
                ListEmptyComponent={() => (
                    <View className="items-center justify-center flex-col gap-y-3">
                                <Image source={images.searchNotFound} resizeMode="cover" />
                                <Text className="paragraph-bold">No items in your cart</Text>
                                <Text className="text-gray-300">Go to search page and add items to your cart</Text>
                            </View>
                )}
                ListFooterComponent={() =>
                    totalItems > 0 && (
                        <View className="gap-5">
                            <View className="mt-6 border border-gray-200 p-5 rounded-xl">
                                <Text className="h3-bold text-dark-100 mb-5">
                                    Payment Summary
                                </Text>
                                <PaymentInfoStripe
                                    label={`Total Items (${totalItems})`}
                                    value={`${totalPrice.toFixed(2)}`}
                                />
                                <PaymentInfoStripe
                                    label={`Delivery Fee`}
                                    value={`$5.00`}
                                />
                                <PaymentInfoStripe
                                    label={`Discount`}
                                    value={`-$0.50`}
                                    valueStyle="!text-success"
                                />
                                <View className="border-t border-t-gray-300 my-2" />
                                <PaymentInfoStripe
                                    label={`Total`}
                                    value={`$${(totalPrice + 5 - 0.5).toFixed(2)}`}
                                    labelStyle="!base-bold !text-dark-100"
                                    valueStyle="base-bold !text-dark-100 !text-right"
                                />
                            </View>
                            <Button title="Order now" />
                        </View>
                    )
                }
            />
        </SafeAreaView>
    );
}
