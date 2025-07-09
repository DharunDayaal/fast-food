import TabBarIcon from "@/components/TabBarIcon";
import { images } from "@/constants";
import useAuthStore from "@/store/authStore";
import { Redirect, Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) return <Redirect href={"/sign-in"} />;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 80,
                    borderRadius: 50,
                    position: "absolute",
                    bottom: 40,
                    shadowColor: "#1a1a1a",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    marginHorizontal: 20,
                    elevation: 4,
                    shadowRadius: 4,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            focused={focused}
                            title="Home"
                            icon={images.home}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            focused={focused}
                            title="Search"
                            icon={images.search}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "Cart",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            focused={focused}
                            title="Cart"
                            icon={images.bag}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            focused={focused}
                            title="Profile"
                            icon={images.user}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
