import { images } from "@/constants";
import React from "react";
import { Image, Text, View } from "react-native";

const DeliverySection = ({ rating }: { rating: number }) => {
    return (
        <View className="flex-row justify-between items-center my-12 mx-3 bg-[#FE8C000D]/5 rounded-full p-6">
            <Text className="h3-bold font-bold">
                {/* <Text className="text-primary font-extrabold">$</Text> */}
                <Image
                    source={images.dollar}
                    className="size-6"
                    resizeMode="contain"
                />{" "}
                Free Delivery
            </Text>
            <Text className="h3-bold font-bold">
                <Image
                    source={images.clock}
                    className="size-10"
                    resizeMode="contain"
                />{" "}
                20 - 30 mins
            </Text>
            <Text className="h3-bold font-bold">
                <Image
                    source={images.star}
                    className="size-9"
                    resizeMode="contain"
                />{" "}
                {rating}
            </Text>
        </View>
    );
};

export default DeliverySection;
