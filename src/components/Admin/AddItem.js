import React, { useState } from "react";
import { databases, client } from "../../services/api";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !image) {
      setError("All fields are required.");
      return;
    }

    const bucketId = "YOUR_BUCKET_ID";
    const databaseId = "YOUR_DATABASE_ID";
    const collectionId = "YOUR_COLLECTION_ID";

    try {
      // Upload the image to Appwrite Storage
      const response = await client.storage.createFile(
        bucketId,
        uuidv4(),
        image
      );
      const imageUrl = response.$id;

      // Save item details to Appwrite Database
      await databases.createDocument(databaseId, collectionId, uuidv4(), {
        name,
        description,
        imageUrl,
      });

      navigate("/admin/dashboard");
    } catch (error) {
      setError("Failed to add item. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center">Add New Item</h2>
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
              Image
            </label>
            <input
              type="file"
              className="w-full p-2 mt-1 border border-gray-300 rounded-md"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
