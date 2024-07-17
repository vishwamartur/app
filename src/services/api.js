import { Client, Account, Databases, Storage } from "appwrite";

// Initialize Appwrite client
const client = new Client();

client
  .setEndpoint("https://[YOUR_APPWRITE_ENDPOINT]") // Replace with your Appwrite endpoint
  .setProject("[YOUR_PROJECT_ID]"); // Replace with your Appwrite project ID

// Initialize Appwrite services
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Authentication functions
export const login = async (email, password) => {
  try {
    const response = await account.createEmailSession(email, password);
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (email, password) => {
  try {
    const response = await account.create("unique()", email, password);
    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    throw error;
  }
};

// User-related functions
export const getCurrentUser = async () => {
  try {
    const response = await account.get();
    return response;
  } catch (error) {
    throw error;
  }
};

// Item management functions
export const addItem = async (data) => {
  try {
    const response = await databases.createDocument(
      "[YOUR_DATABASE_ID]", // Replace with your Database ID
      "[YOUR_COLLECTION_ID]", // Replace with your Collection ID
      "unique()",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateItem = async (documentId, data) => {
  try {
    const response = await databases.updateDocument(
      "[YOUR_DATABASE_ID]", // Replace with your Database ID
      "[YOUR_COLLECTION_ID]", // Replace with your Collection ID
      documentId,
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async (documentId) => {
  try {
    const response = await databases.deleteDocument(
      "[YOUR_DATABASE_ID]", // Replace with your Database ID
      "[YOUR_COLLECTION_ID]", // Replace with your Collection ID
      documentId
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getItems = async () => {
  try {
    const response = await databases.listDocuments(
      "[YOUR_DATABASE_ID]", // Replace with your Database ID
      "[YOUR_COLLECTION_ID]" // Replace with your Collection ID
    );
    return response.documents;
  } catch (error) {
    throw error;
  }
};

// File upload function
export const uploadFile = async (file) => {
  try {
    const response = await storage.createFile(
      "[YOUR_BUCKET_ID]", // Replace with your Bucket ID
      "unique()",
      file
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Reservation functions
export const reserveItem = async (data) => {
  try {
    const response = await databases.createDocument(
      "[YOUR_DATABASE_ID]", // Replace with your Database ID
      "[YOUR_RESERVATION_COLLECTION_ID]", // Replace with your Reservation Collection ID
      "unique()",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getReservations = async () => {
  try {
    const response = await databases.listDocuments(
      "[YOUR_DATABASE_ID]", // Replace with your Database ID
      "[YOUR_RESERVATION_COLLECTION_ID]" // Replace with your Reservation Collection ID
    );
    return response.documents;
  } catch (error) {
    throw error;
  }
};
