import { CustomButtonProps } from "@/type";
import clsx from "clsx";
import React from "react";
import { Text, View , TouchableOpacity, ActivityIndicator} from "react-native";

const Button = ({
    onPress,
    title = "Click Me",
    style,
    textStyle,
    leftIcon,
    isLoading = false,
}: CustomButtonProps) => {
    return (
        <TouchableOpacity className={clsx("custom-btn", style)} onPress={onPress}>
            {leftIcon}
            <View className="flex-center flex-row">
                {isLoading ? (
                    <ActivityIndicator size={"small"} color={"white"} />
                ):(
                    <Text className={clsx("text-white-100 paragraph-semibold", textStyle)}>{title}</Text>
                )}
            </View>
        </TouchableOpacity>
    );
};

export default Button;
