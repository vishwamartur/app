import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { databases } from "../../services/api";

const AdminDashboard = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      const databaseId = "YOUR_DATABASE_ID";
      const collectionId = "YOUR_COLLECTION_ID";
      try {
        const response = await databases.listDocuments(
          databaseId,
          collectionId
        );
        setItems(response.documents);
      } catch (error) {
        console.error("Failed to fetch items:", error);
        setError("Failed to fetch items.");
      }
    };
    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    const databaseId = "YOUR_DATABASE_ID";
    const collectionId = "YOUR_COLLECTION_ID";
    try {
      await databases.deleteDocument(databaseId, collectionId, itemId);
      setItems(items.filter((item) => item.$id !== itemId));
    } catch (error) {
      setError("Failed to delete item. Please try again.");
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
          <div className="flex justify-end mt-6">
            <Link
              to="/admin/add"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Add New Item
            </Link>
          </div>
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div key={item.$id} className="p-6 bg-white rounded-lg shadow-md">
                <img
                  src={`https://your-appwrite-endpoint/v1/storage/files/${item.imageUrl}/preview`}
                  alt={item.name}
                  className="object-cover w-full h-48 mb-4 rounded"
                />
                <h3 className="mb-2 text-lg font-bold">{item.name}</h3>
                <p className="mb-4 text-gray-700">{item.description}</p>
                <div className="flex justify-between">
                  <Link
                    to={`/admin/edit/${item.$id}`}
                    className="px-4 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item.$id)}
                    className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
