import { View, TextInput, Image, Text, ImageSourcePropType } from "react-native";
import React, { useState } from "react";
import clsx from "clsx";

interface ProfileInputProps {
    label: string;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
    value: string;
    onChangeText: (text: string) => void;
    icon: ImageSourcePropType;
    placeholder: string;
    editable?: boolean; // 👈 Add this
}

const ProfileInput = ({
    label,
    keyboardType = "default",
    value,
    onChangeText,
    icon,
    placeholder,
    editable = false, // 👈 default to read-only
}: ProfileInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View className="p-4 flex-row items-center gap-x-3">
            <Image source={icon} className="size-8 rounded-full bg-[#fff1e0] p-5" />
            <View className="flex-1">
                <Text className="text-gray-500 ml-1 text-sm">{label}</Text>
                <TextInput
                    placeholder={placeholder}
                    onChangeText={onChangeText}
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={value}
                    keyboardType={keyboardType}
                    editable={editable} // 👈 respect this
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholderTextColor="#888"
                    className={clsx(
                        "text-base font-semibold text-black",
                        editable ? "border-b border-primary" : "border-transparent"
                    )}
                />
            </View>
        </View>
    );
};

export default ProfileInput