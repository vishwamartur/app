import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useItems } from "../../context/ItemContext";
import { useAuth } from "../../context/AuthContext";
import Countdown from "../../components/User/Countdown";
import ReserveItem from "../../components/User/ReserveItem";

const Dashboard = () => {
  const { items, loading, reserveItem } = useItems();
  const { user, logout } = useAuth();
  const history = useHistory();
  const [selectedItem, setSelectedItem] = useState(null);
  const [action, setAction] = useState(null);

  useEffect(() => {
    if (!user) {
      history.push("/");
    }
  }, [user, history]);

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  const handleReserve = async (itemId, startDate, endDate) => {
    try {
      await reserveItem(itemId, startDate, endDate);
      setAction(null);
    } catch (error) {
      console.error("Failed to reserve item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between px-8 py-4 text-white bg-blue-500">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header>
      <main className="p-8">
        <h2 className="mb-4 text-xl font-bold">Available Items</h2>
        {loading ? (
          <p>Loading items...</p>
        ) : (
          <div>
            {items.map((item) => (
              <div
                key={item.$id}
                className="flex items-center justify-between p-4 mb-4 bg-white rounded shadow-md"
              >
                <div>
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p>{item.description}</p>
                  {item.reservationEndDate && (
                    <Countdown endDate={new Date(item.reservationEndDate)} />
                  )}
                </div>
                <div>
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setAction("reserve");
                    }}
                    className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                  >
                    Reserve
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {action === "reserve" && selectedItem && (
          <ReserveItem
            item={selectedItem}
            onClose={() => setAction(null)}
            onReserve={handleReserve}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
