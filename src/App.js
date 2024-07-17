import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ItemProvider } from "./context/ItemContext";
import AdminDashboard from "./pages/Admin/Dashboard";
import UserDashboard from "./pages/User/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/tailwind.css";

const App = () => {
  return (
    <AuthProvider>
      <ItemProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/admin/dashboard" component={AdminDashboard} />
              <Route path="/user/dashboard" component={UserDashboard} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </div>
        </Router>
      </ItemProvider>
    </AuthProvider>
  );
};

export default App;
