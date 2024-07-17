import React from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  const history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  const handleSignup = () => {
    history.push("/signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="flex items-center justify-between w-full px-8 py-4 text-white bg-blue-500">
        <h1 className="text-2xl font-bold">Capex Item Reservation</h1>
        {user ? (
          <button
            onClick={() => {
              if (user.role === "admin") {
                history.push("/admin/dashboard");
              } else {
                history.push("/user/dashboard");
              }
            }}
            className="px-4 py-2 font-bold text-blue-500 bg-white rounded"
          >
            Go to Dashboard
          </button>
        ) : (
          <div className="flex space-x-2">
            <button
              onClick={handleLogin}
              className="px-4 py-2 font-bold text-blue-500 bg-white rounded"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="px-4 py-2 font-bold text-blue-500 bg-white rounded"
            >
              Sign Up
            </button>
          </div>
        )}
      </header>
      <main className="flex flex-col items-center justify-center flex-1 p-8">
        <h2 className="mb-4 text-3xl font-bold">
          Welcome to Capex Item Reservation
        </h2>
        <p className="mb-8 text-lg text-center">
          Reserve your items easily and efficiently. Whether you're an admin
          managing the items or a user looking to reserve an item, our platform
          has got you covered.
        </p>
        <img
          src="/path/to/your/image.jpg"
          alt="Capex Reservation"
          className="w-1/2 mb-8 rounded shadow-md"
        />
        {!user && (
          <div className="flex space-x-4">
            <button
              onClick={handleLogin}
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            >
              Login
            </button>
            <button
              onClick={handleSignup}
              className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
            >
              Sign Up
            </button>
          </div>
        )}
      </main>
      <footer className="w-full py-4 text-center text-white bg-gray-800">
        <p>&copy; 2024 Capex Item Reservation. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
