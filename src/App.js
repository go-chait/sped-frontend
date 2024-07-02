import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import AddDataForm from "./components/AddDataForm";
import DataTable from "./components/DataTable";
import axios from "axios";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const [tokenExpiration, setTokenExpiration] = useState(0);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const loggedInStatus = localStorage.getItem('isAuthenticated');
      setIsAuthenticated(loggedInStatus === 'true');
    };
    checkLoggedInStatus();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem('isAuthenticated', 'true');
        setIsAuthenticated(true);
        const tokenExpiration = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem('tokenExpiration', tokenExpiration);
        setTokenExpiration(tokenExpiration);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.setItem('tokenExpiration', 0);
    setIsAuthenticated(false);
    setTokenExpiration(0);
  };

  const handleAddData = async () => {};

  if (!isAuthenticated) {
      if(tokenExpiration > 0) {
        const newTime = new Date();
        if(newTime.getTime() - tokenExpiration.getTime() >= 0) {
          return <Login onLogin={handleLogin} />;
        }
      }
      else {
        return <Login onLogin={handleLogin} />; 
      }
    }

  return (
    <div className="App">
      <Header onLogout={handleLogout} />
      <AddDataForm onAddData={handleAddData} />
      <DataTable data={data} />
    </div>
  );
}

export default App;
