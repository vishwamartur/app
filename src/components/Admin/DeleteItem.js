import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { databases } from "../../services/api";

const DeleteItem = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      const databaseId = "YOUR_DATABASE_ID";
      const collectionId = "YOUR_COLLECTION_ID";
      try {
        const response = await databases.getDocument(
          databaseId,
          collectionId,
          itemId
        );
        setItemName(response.name);
        setItemDescription(response.description);
        setCurrentImageUrl(response.imageUrl);
      } catch (error) {
        console.error("Failed to fetch item:", error);
        setError("Failed to fetch item details.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchItem();
  }, [itemId]);

  const handleDelete = async () => {
    const databaseId = "YOUR_DATABASE_ID";
    const collectionId = "YOUR_COLLECTION_ID";
    try {
      await databases.deleteDocument(databaseId, collectionId, itemId);
      navigate("/admin/dashboard");
    } catch (error) {
      setError("Failed to delete item. Please try again.");
      console.error("Failed to delete item:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center">Delete Item</h2>
        {error && <p className="text-center text-red-500">{error}</p>}
        <div>
          <h3 className="text-lg font-bold">Item Name:</h3>
          <p>{itemName}</p>
        </div>
        <div>
          <h3 className="text-lg font-bold">Description:</h3>
          <p>{itemDescription}</p>
        </div>
        {currentImageUrl && (
          <div>
            <h3 className="text-lg font-bold">Current Image:</h3>
            <img
              src={`https://your-appwrite-endpoint/v1/storage/files/${currentImageUrl}/preview`}
              alt="Current Item"
              className="w-full h-auto mt-2 mb-4"
            />
          </div>
        )}
        <button
          onClick={() => setShowConfirmation(true)}
          className="w-full px-4 py-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          Delete Item
        </button>
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md">
              <h2 className="text-2xl font-bold text-center">Are you sure?</h2>
              <p className="text-center">
                Do you really want to delete this item? This process cannot be
                undone.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="w-1/2 px-4 py-2 mr-2 font-medium text-white bg-gray-500 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="w-1/2 px-4 py-2 ml-2 font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteItem;
