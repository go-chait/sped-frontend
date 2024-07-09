import React, {useState, useEffect} from "react";
import "../App.css";

function App() {
  const [data, setData] = useState([]);

  const DataTable = async () => {
    const url = "http://localhost:8000/data/getAllData"
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data?.response);
    } catch (error) {
      console.log("Error occured " +error);
    }
  };

  useEffect(() => {
    DataTable();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default App;
