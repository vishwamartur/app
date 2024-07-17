import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { databases, client } from "../../services/api";

const EditItem = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [error, setError] = useState("");

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
        setName(response.name);
        setDescription(response.description);
        setCurrentImageUrl(response.imageUrl);
      } catch (error) {
        console.error("Failed to fetch item:", error);
        setError("Failed to fetch item details.");
      }
    };
    fetchItem();
  }, [itemId]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !description) {
      setError("Name and description are required.");
      return;
    }

    const bucketId = "YOUR_BUCKET_ID";
    const databaseId = "YOUR_DATABASE_ID";
    const collectionId = "YOUR_COLLECTION_ID";

    try {
      let imageUrl = currentImageUrl;
      if (image) {
        // Upload the new image to Appwrite Storage
        const uploadResponse = await client.storage.createFile(
          bucketId,
          itemId,
          image
        );
        imageUrl = uploadResponse.$id;
      }

      // Update item details in Appwrite Database
      await databases.updateDocument(databaseId, collectionId, itemId, {
        name,
        description,
        imageUrl,
      });

      navigate("/admin/dashboard");
    } catch (error) {
      setError("Failed to update item. Please try again.");
      console.error("Failed to update item:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center">Edit Item</h2>
        {error && <p className="text-center text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Item Name
            </label>
            <input
              type="text"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Image
            </label>
            {currentImageUrl && (
              <img
                src={`https://your-appwrite-endpoint/v1/storage/files/${currentImageUrl}/preview`}
                alt="Current Item"
                className="w-full h-auto mt-2 mb-4"
              />
            )}
            <label className="block text-sm font-medium text-gray-700">
              Change Image
            </label>
            <input
              type="file"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Update Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
