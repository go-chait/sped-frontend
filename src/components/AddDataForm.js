import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import FormData from "form-data";

const AddDataForm = ({ onAddData }) => {
  const [dataType, setDataType] = useState("PDF");
  const [dataLink, setDataLink] = useState("");
  const [dataFile, setDataFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    let requestBody;
    let contentType;
    if (dataType === "PDF" && dataFile) {
      formData.append('file', dataFile);
      requestBody = formData;
      contentType = "multipart/form-data";
    }
    else if (dataType === "Link" && dataLink) {
      requestBody = {
        "url": dataLink
      };
      contentType = "application/json";
    }
    try {
      const response = await axios.post('http://localhost:8000/scrape/sped_scrape_and_insert', requestBody, {
        headers: {
          "Content-Type": contentType,
          Authorization: `Bearer ${localStorage.getItem('isAuthenticated')}`
        }
      });
      console.log(response);
      if (response.status === 200) {
        setSuccessMsg(response.data.detail);
        e.target.reset();
        setDataFile(null);
        setDataLink("");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="add-data-form" onSubmit={handleSubmit}>
      <div>
        <label>Data Type:</label>
        <select value={dataType} onChange={(e) => setDataType(e.target.value)}>
          <option value="PDF">PDF</option>
          <option value="Link">Link</option>
        </select>
      </div>
      {dataType === "Link" && (
        <div>
          <label>Link URL:</label>
          <input
            type="text"
            value={dataLink}
            onChange={(e) => setDataLink(e.target.value)}
          />
        </div>
      )}
      {dataType === "PDF" && (
        <div>
          <label>Upload PDF:</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setDataFile(e.target.files[0])}
          />
        </div>
      )}
      <button type="submit">Add</button>
      {successMsg && <p className="success-msg">{successMsg}</p>}
    </form>
  );
};

export default AddDataForm;