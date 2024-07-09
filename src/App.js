import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Header from "./components/Header";
import AddDataForm from "./components/AddDataForm";
import DataTable from "./components/DataTable";
import axios from "axios";
import "./App.css";
import Popup from "./components/Popup";
import { isExpired } from "react-jwt";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const togglePopup = async () => {
    setIsPopupOpen(!isPopupOpen);
    // const url = "http://localhost:8000/data/getAllData"
    // const response = await fetch(url);
    // const data = await response.json();
    // setData(data?.response);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('isAuthenticated');
    if (storedToken) {
      setIsAuthenticated(true);
    }
    const tokenCheck = isExpired(localStorage.getItem('isAuthenticated'));
    setIsTokenExpired(tokenCheck);
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem('isAuthenticated', response.data.access_token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const handleAddData = async () => { };

  if (!isAuthenticated || isTokenExpired) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <Header onLogout={handleLogout} />
      <button className="add-data-btn" onClick={togglePopup}>Add Data</button>
      <Popup isOpen={isPopupOpen} onClose={togglePopup} />
      <DataTable data={data} />
    </div>
  );
}

export default App;
