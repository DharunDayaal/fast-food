import React from "react";
import { Text, View } from "react-native";

interface NutrientComponentProps {
    title: string;
    value: number;
    subDomain: string;
}

const NutrientComponent = ({
    title,
    value,
    subDomain,
}: NutrientComponentProps) => {
    return (
        <View className="flex-col gap-y-2">
            <Text className="text-gray-400 font-quicksand-light">{title}</Text>
            <Text className="paragraph-bold">
                {value}{subDomain}
            </Text>
        </View>
    );
};

export default NutrientComponent;
