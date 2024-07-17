import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useItems } from "../../context/ItemContext";
import { useAuth } from "../../context/AuthContext";
import AddItem from "../../components/Admin/AddItem";
import EditItem from "../../components/Admin/EditItem";
import DeleteItem from "../../components/Admin/DeleteItem";
import ItemList from "../../components/ItemList";

const Dashboard = () => {
  const { items, loading, deleteItem } = useItems();
  const { user, logout } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      history.push("/");
    }
  }, [user, history]);

  const handleLogout = () => {
    logout();
    history.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between px-8 py-4 text-white bg-blue-500">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </header>
      <main className="p-8">
        <h2 className="mb-4 text-xl font-bold">Manage Items</h2>
        <AddItem />
        {loading ? (
          <p>Loading items...</p>
        ) : (
          <ItemList items={items} EditItem={EditItem} DeleteItem={DeleteItem} />
        )}
      </main>
    </div>
  );
};

export default Dashboard;
