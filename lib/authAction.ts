import useAuthStore from "@/store/authStore"
import { Account, Client, Databases } from "react-native-appwrite"

export const appWriteConfig = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!,
    platform: "com.dharun.fastfood",
    databaseId: '686cc64c00227fe82732',
    bucketId: '686e03c10013e911888f',
    userCollectionId: '686cc67900110a2745c1',
    categoriesCollectionId: '686dff0f001720615e0d',
    menuCollectionId: '686dffb800372b84b9e7',
    customizationsCollectionId: '686e01040002680e6b56',
    menuCustomizationsCollectionId:'686e02890022bdf13adf',
}

export const client = new Client()

client
    .setEndpoint(appWriteConfig.endpoint)
    .setProject(appWriteConfig.projectId)
    .setPlatform(appWriteConfig.platform)

export const account = new Account(client)

export const databases = new Databases(client)

export const logOut = async () => {
    try {
        await account.deleteSession("current");
        const { setIsAuthenticated, setUser } = useAuthStore.getState();
        setIsAuthenticated(false);
        setUser(null);
    } catch (error) {
        throw new Error(error as string)
    }
}
