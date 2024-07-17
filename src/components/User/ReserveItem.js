import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { databases } from "../../services/api";
import Calendar from "../Calendar";
import Countdown from "../Countdown";
import "react-datepicker/dist/react-datepicker.css";

const ReserveItem = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isReserved, setIsReserved] = useState(false);

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
      }
    };
    fetchItem();
  }, [itemId]);

  const handleReserve = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate || startDate >= endDate) {
      setError("Invalid date range.");
      return;
    }

    const databaseId = "YOUR_DATABASE_ID";
    const collectionId = "YOUR_COLLECTION_ID";
    const reservationsCollectionId = "YOUR_RESERVATIONS_COLLECTION_ID";
    const userId = "USER_ID"; // Replace with the actual user ID

    try {
      // Check for existing reservations
      const response = await databases.listDocuments(
        databaseId,
        reservationsCollectionId,
        [
          databases.query.equal("itemId", itemId),
          databases.query.greaterThanEqual("endDate", startDate.toISOString()),
          databases.query.lessThanEqual("startDate", endDate.toISOString()),
        ]
      );

      if (response.documents.length > 0) {
        setError("This item is already reserved for the selected date range.");
        return;
      }

      // Reserve the item
      await databases.createDocument(databaseId, reservationsCollectionId, {
        userId,
        itemId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

      setSuccess("Item reserved successfully.");
      setIsReserved(true);
      navigate("/user/dashboard");
    } catch (error) {
      setError("Failed to reserve item. Please try again.");
      console.error("Failed to reserve item:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center">Reserve Item</h2>
        {error && <p className="text-center text-red-500">{error}</p>}
        {success && <p className="text-center text-green-500">{success}</p>}
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
        <form onSubmit={handleReserve} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <Calendar
              selectedDate={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <Calendar
              selectedDate={endDate}
              onChange={(date) => setEndDate(date)}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Reserve Item
          </button>
        </form>
        {isReserved && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Countdown to End Date:</h3>
            <Countdown endDate={endDate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReserveItem;
