import useAuthStore from "@/store/authStore"
import { CreateUserParams, GetMenuParams, SignInParams, UpdateProfileParams, User } from "@/type"
import mime from 'mime'
import { Account, Avatars, Client, Databases, ID, Permission, Query, Role, Storage } from "react-native-appwrite"

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

export const storage = new Storage(client)

const avatars = new Avatars(client)

export const createUser = async ({ email, password, name }: CreateUserParams) => {
    try {
        const newAccount = await account.create(ID.unique(), email, password, name)
        if(!newAccount)
            throw Error

        const avatarUrl = avatars.getInitialsURL(name)

        await signIn({email, password})

        return await databases.createDocument(
            appWriteConfig.databaseId, 
            appWriteConfig.userCollectionId, 
            ID.unique(),
            { email, name, accountId: newAccount.$id, avatar: avatarUrl }
        )
    } catch (error) {
        throw new Error(error as string)
    }
}

export const signIn = async ({email, password}:SignInParams) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
    } catch (error) {
        throw new Error(error as string)
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if(!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error

        return currentUser?.documents[0]
    } catch (error: any) {
        console.log("Error", error.message)
        throw new Error(error as string)
    }
}

export const getMenu = async ({ category, query }: GetMenuParams) => {
    try {
        const queries: string[] = []

        if(category)
            queries.push(Query.equal('categories', category))
        if(query)
            queries.push(Query.search('name', query))

        const menus = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.menuCollectionId,
            queries
        )

        return menus.documents
    } catch (error) {
        throw new Error(error as string)
    }
}


export const getCategories = async () => {
    try {
        const categories = await databases.listDocuments(
            appWriteConfig.databaseId,
            appWriteConfig.categoriesCollectionId
        )
        return categories.documents;
    } catch (error) {
        throw new Error(error as string)
    }
}

export const uploadImageToStorage = async (uri: string) => {
    try {
        const fileName = uri?.split('/').pop() || `avatar_${Date.now()}`;
        const fileType = mime.getType(uri) || 'image/jpeg';

        const file = {
            uri,
            name: fileName,
            type: fileType,
            size: 12
        };

        const response = await storage.createFile(
            appWriteConfig.bucketId,
            ID.unique(),
            file,
            [Permission.read(Role.any())]
        );

        return response;
    } catch (error) {
        throw new Error(error as string)
    }
}

export const getAvatarUrl = async (fileId: string) => {
    try {
        return storage.getFileViewURL(appWriteConfig.bucketId, fileId);
    } catch (error) {
        throw new Error(error as string)
    }
};

export const updateUserAvatar = async (id: string, avatarUrl: URL) => {
    try {
        const response = await databases.updateDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            id,
            {avatar: avatarUrl}
        )

        return response
    } catch (error) {
        throw new Error(error as string)
    }
}

export const updateUser = async (id: string, data: UpdateProfileParams) => {
    try {
        const response = await databases.updateDocument(
            appWriteConfig.databaseId,
            appWriteConfig.userCollectionId,
            id,
            data
        )

    } catch (error) {
        throw new Error(error as string);
    }
}

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