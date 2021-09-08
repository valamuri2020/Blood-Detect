import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "react-bootstrap";
import { Navbar } from "../navbar/navbar";
import axios from "axios";

export const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState("https://cdn.pixabay.com/photo/2017/07/08/11/10/dot-pattern-2484077_960_720.jpg");
  
  const handleFileUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
        if (reader.readyState === 2) {
            setImg(reader.result)
        }
    }
    reader.readAsDataURL(e.target.files[0])
  };

  useEffect(() => {
    console.log("dashboard loaded");
    
  }, [img])

  const handleFileSelect = (e) => {
    console.log(e.target.files[0]);
  };

  const { currentUser } = useAuth();
  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <h3>{currentUser.email}</h3>
      <img src={img} alt="" className="src" height="100" width="100"/>
      <input
        type="file"
        accept="image/*"
        id="input"
        style={{ opacity: 0.1 }}
        onChange={handleFileUpload}
      />
      <div className="label">
        <label htmlFor="input">Select Image</label>
      </div>
      <Button onClick={handleFileUpload}>Upload Image</Button>
      {/* <Button variant="link" onClick={handleSubmit}>Log out</Button> */}
    </>
  );
};
