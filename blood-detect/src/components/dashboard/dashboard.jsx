import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Navbar } from "../navbar/navbar";
import {
  Image,
  PageWrapper,
  PageHeader,
  SubmitButton,
} from "./dashboardStyles";
import axios from "axios";

export const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(
    "https://cdn.pixabay.com/photo/2017/07/08/11/10/dot-pattern-2484077_960_720.jpg"
  );
  const [uploaded, setUploaded] = useState(true);
  const [prediction, setPrediction] = useState("");
  
  const handleFileUpload = (e) => {
    setUploaded(false);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    console.log(e.target.files[0]);
    setFile(e.target.files[0])
  };

  useEffect(() => {
    console.log("dashboard loaded");
  }, [img]);

  useEffect(() => {
    console.log(prediction["data"]);
  }, [prediction]);

  const handleFileSubmit = (e) => {
    let data = new FormData()
    data.append('file', file)

    axios.post("/predict", data)
    .then((res) => setPrediction(res.data))
  };

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <PageWrapper fluid>
        <PageHeader>Upload Blood Cell Image</PageHeader>

        <Row>
          <Col md={4} />
          <Col>

            <Image src={img} alt="" className="src" size="62vh" />
          </Col>
        </Row>
        <Row>
          <div className="col-md-6 text-md-right">
            <input
              type="file"
              accept="image/*"
              id="input"
              style={{ opacity: 0.01 }}
              onChange={handleFileUpload}
            />
            <div className="label">
              <Button>
                <label htmlFor="input">Select Image</label>
              </Button>
            </div>
          </div>
          <div className="col-md-6 text-md-left">
            <br />
            <SubmitButton disabled={uploaded} onClick={handleFileSubmit}>
              Upload Image
            </SubmitButton>
          </div>
        </Row>
      </PageWrapper>

      {/* <Button variant="link" onClick={handleSubmit}>Log out</Button> */}
    </>
  );
};
