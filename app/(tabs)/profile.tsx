import Header from "@/components/Header";
import { images } from "@/constants";
import {
    appWriteConfig,
    getAvatarUrl,
    updateUserAvatar,
    uploadImageToStorage,
} from "@/lib/appwrite";
import useAuthStore from "@/store/authStore";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    const [image, setImage] = useState<string | null>(null);

    const { user } = useAuthStore();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "livePhotos"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result?.canceled) {
            setImage(result?.assets[0]?.uri);
        }

        try {
            if (result.assets && !result.canceled) {
                const uplodedFile = await uploadImageToStorage(
                    result.assets[0].uri
                );
                const avatarUrl = await getAvatarUrl(uplodedFile.$id);
                if (user) await updateUserAvatar(user?.$id, avatarUrl); // to check with the use of promise.all() reduce the latency and time issue
            }
        } catch (error) {
            throw new Error(error as string);
        }
    };

    return (
        <SafeAreaView className="p-6 bg-fuchsia-300 flex-1">
            <Header title="Profile" />
            <View className="items-center flex-row justify-center">
                <View className="relative">
                    <Image
                        source={{
                            uri: image
                                ? image
                                : user?.avatar +
                                  `?project=${appWriteConfig.projectId}`,
                        }}
                        className="rounded-full size-36"
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        className="bg-primary rounded-full p-1 absolute right-1 bottom-0 border-white border border-1"
                        onPress={pickImage}
                    >
                        <Image
                            source={images.pencil}
                            className="size-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
