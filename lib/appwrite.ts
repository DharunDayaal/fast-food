import { CreateUserParams, GetMenuParams, SignInParams } from "@/type"
import { Account, Avatars, Client, Databases, ID, Query, Storage } from "react-native-appwrite"

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