import { TabBarIconProps } from "@/type";
import clsx from "clsx";
import React from "react";
import { Image, Text, View } from "react-native";

const TabBarIcon = ({ focused, icon, title }: TabBarIconProps) => {
    return (
        <View className="tab-icon">
            <Image
                source={icon}
                className="size-7"
                resizeMode="contain"
                tintColor={focused ? "#FE8C00" : "#5D5F6d"}
            />
            <Text
                className={clsx(
                    "text-sm font-bold",
                    focused ? "text-primary" : "text-gray-200"
                )}
            >
                {title}
            </Text>
        </View>
    );
};

export default TabBarIcon;
