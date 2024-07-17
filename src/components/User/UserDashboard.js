import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { databases } from "../../services/api";

const UserDashboard = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="py-8">
          <h1 className="text-2xl font-bold text-center">User Dashboard</h1>
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
                    to={`/user/reserve/${item.$id}`}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    Reserve
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
