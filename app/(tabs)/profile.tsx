import Button from "@/components/Button";
import Header from "@/components/Header";
import ProfileInput from "@/components/ProfileInput";
import { images } from "@/constants";
import {
    appWriteConfig,
    getAvatarUrl,
    updateUser,
    updateUserAvatar,
    uploadImageToStorage,
} from "@/lib/appwrite";
import { logOut } from "@/lib/authAction";
import useAuthStore from "@/store/authStore";
import { UpdateProfileParams } from "@/type";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
    const { user } = useAuthStore();
    const [image, setImage] = useState<string | null>(null);
    const [formData, setFormData] = useState<UpdateProfileParams>({
        name: (user?.name.trim() as string) || "",
        email: (user?.email.trim() as string) || "",
        phone_number: (user?.phone_number.trim() as string) || "",
        address: (user?.address.trim() as string) || "",
    });
    const [isEditable, setIsEditable] = useState(false);

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
                if (user) await updateUserAvatar(user?.$id, avatarUrl);
            }
        } catch (error) {
            throw new Error(error as string);
        }
    };

    const handleToggle = () => {
        setIsEditable(!isEditable);
    };

    const handleSaveProfile = async () => {
        try {
            await updateUser(user?.$id as string, formData);
            setIsEditable(false);
        } catch (error) {
            console.log("Error updating profile:", error);
        }
    };

    const handleLogout = async () => {
        try {
            await logOut();
        } catch (error) {
            throw new Error(error as string);
        }
    };

    return (
        <SafeAreaView className="p-6 flex-1">
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
                        className="bg-primary rounded-full p-1 absolute right-1 bottom-0 border-neutral-50 border border-1"
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
            <View className="flex-col gap-y-2 mt-12">
                <ProfileInput
                    label="Full Name"
                    value={formData.name}
                    placeholder="Enter Name"
                    editable={isEditable}
                    onChangeText={(text) =>
                        setFormData((prev) => ({ ...prev, name: text }))
                    }
                    icon={images.user}
                />
                <ProfileInput
                    label="Email"
                    value={formData.email}
                    placeholder="Enter email"
                    keyboardType="email-address"
                    editable={isEditable}
                    onChangeText={(text) =>
                        setFormData((prev) => ({ ...prev, email: text }))
                    }
                    icon={images.envelope}
                />
                <ProfileInput
                    label="Phone Number"
                    value={formData.phone_number}
                    placeholder="Enter phone number"
                    keyboardType="phone-pad"
                    editable={isEditable}
                    onChangeText={(text) =>
                        setFormData((prev) => ({ ...prev, phone_number: text }))
                    }
                    icon={images.phone}
                />
                <ProfileInput
                    label="Address"
                    value={formData.address}
                    placeholder="Enter address"
                    editable={isEditable}
                    onChangeText={(text) =>
                        setFormData((prev) => ({ ...prev, address: text }))
                    }
                    icon={images.location}
                />
            </View>
            <Button title="Edit Profile" onPress={handleToggle} />
            {isEditable && (
                <Button
                    title="Save Profile"
                    style="mt-6 bg-neutral-200"
                    textStyle="text-[#FE8C00] text-bold"
                    onPress={handleSaveProfile}
                />
            )}
            <Button
                title="Logout"
                style="mt-6 bg-neutral-100 border border-1 border-red-600"
                textStyle="text-red-600 text-bold"
                onPress={handleLogout}
                leftIcon={
                    <Image
                        source={images.logout}
                        className="size-6 mr-1"
                        resizeMode="contain"
                    />
                }
            />
        </SafeAreaView>
    );
}
