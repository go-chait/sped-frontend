import React, {Component} from 'react';
import "./Popup.css";
import AddDataForm from "./AddDataForm";

const Popup = ({ isOpen, onClose }) => {
    return (
        isOpen && (
            <div className="popup">
                <div className="popup-content">
                    <label>Add Data</label>
                    <button className="btn-close" onClick={onClose}>X</button>
                    <AddDataForm ></AddDataForm>
                </div>
            </div>
        )
    );
};

export default Popup;