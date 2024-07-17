import React, { createContext, useContext, useState, useEffect } from "react";
import { databases, storage } from "../services/api";

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const databaseId = "YOUR_DATABASE_ID";
        const collectionId = "YOUR_COLLECTION_ID";
        const response = await databases.listDocuments(
          databaseId,
          collectionId
        );
        setItems(response.documents);
      } catch (error) {
        console.error("Failed to fetch items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const addItem = async (name, description, imageFile) => {
    try {
      const databaseId = "YOUR_DATABASE_ID";
      const collectionId = "YOUR_COLLECTION_ID";
      const bucketId = "YOUR_BUCKET_ID";

      const uploadResponse = await storage.createFile(
        bucketId,
        "unique()",
        imageFile
      );
      const imageUrl = uploadResponse.$id;

      const response = await databases.createDocument(
        databaseId,
        collectionId,
        "unique()",
        {
          name,
          description,
          imageUrl,
        }
      );
      setItems((prevItems) => [...prevItems, response]);
    } catch (error) {
      console.error("Failed to add item:", error);
      throw error;
    }
  };

  const editItem = async (itemId, name, description, imageFile) => {
    try {
      const databaseId = "YOUR_DATABASE_ID";
      const collectionId = "YOUR_COLLECTION_ID";
      const bucketId = "YOUR_BUCKET_ID";

      let imageUrl = null;
      if (imageFile) {
        const uploadResponse = await storage.createFile(
          bucketId,
          "unique()",
          imageFile
        );
        imageUrl = uploadResponse.$id;
      }

      const response = await databases.updateDocument(
        databaseId,
        collectionId,
        itemId,
        {
          name,
          description,
          ...(imageUrl && { imageUrl }),
        }
      );

      setItems((prevItems) =>
        prevItems.map((item) => (item.$id === itemId ? response : item))
      );
    } catch (error) {
      console.error("Failed to edit item:", error);
      throw error;
    }
  };

  const deleteItem = async (itemId) => {
    try {
      const databaseId = "YOUR_DATABASE_ID";
      const collectionId = "YOUR_COLLECTION_ID";

      await databases.deleteDocument(databaseId, collectionId, itemId);
      setItems((prevItems) => prevItems.filter((item) => item.$id !== itemId));
    } catch (error) {
      console.error("Failed to delete item:", error);
      throw error;
    }
  };

  const reserveItem = async (itemId, startDate, endDate) => {
    try {
      const databaseId = "YOUR_DATABASE_ID";
      const reservationsCollectionId = "YOUR_RESERVATIONS_COLLECTION_ID";
      const userId = "USER_ID"; // Replace with the actual user ID

      const response = await databases.createDocument(
        databaseId,
        reservationsCollectionId,
        "unique()",
        {
          userId,
          itemId,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        }
      );

      return response;
    } catch (error) {
      console.error("Failed to reserve item:", error);
      throw error;
    }
  };

  return (
    <ItemContext.Provider
      value={{ items, loading, addItem, editItem, deleteItem, reserveItem }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => {
  return useContext(ItemContext);
};
