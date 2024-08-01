import React, { useState } from "react";
import { Form, Toast } from "react-bootstrap";
import { Button, Modal, Spinner } from "react-bootstrap";
import axiosInstance from "../api/axios";

const categories = [
  "face-on",
  "down-the-line",
  "full-swing",
  "short-game",
  "putting",
  "driving",
  "irons",
  "chipping",
  "pitching",
  "bunker-play",
  "mental-game",
  "fitness",
  "other",
];

function InputFiles() {
  const [file, setFile] = useState(null);
  const [load, setLoad] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [category, setCategory] = useState(categories[0]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (categories.includes(selectedCategory)) {
      setCategory(selectedCategory);
    } else {
      console.error("Selected category not found in the list of categories");
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setLoad(true);
      setFile(selectedFile);
    }
    setLoad(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", category);

    axiosInstance
      .post(`/api/addfile?username=jenny&category=${category}`, formData) // this was formData
      .then((response) => {
        // handle the response
        setShowToast(true);
        setLoad(false);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        setLoad(false);
      });
  };

  return (
    <div className="container">
      <Form encType="multipart/form-data">
        <Form.Group className="mb-3" controlId="lecturePdf">
          <Form.Label>Swing Videos (MP4)</Form.Label>
          <Form.Control
            type="file"
            placeholder="Upload flyers"
            accept=".jpg, .jpeg, .png, .pdf, .mov, .mp4"
            onChange={handleFileUpload}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="categorySelect">
          <Form.Label>Select Category</Form.Label>
          <Form.Select onChange={handleCategoryChange}>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
      <Button variant="success" type="button" onClick={handleSubmit}>
        Upload File
      </Button>
      {load ? (
        <Modal centered show={load} onHide={() => setLoad(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Please be patient...</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Spinner
              animation="border"
              variant="success"
              style={{ marginLeft: "50px" }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="custom"
              className="btn-custom"
              onClick={() => setLoad(false)}
            >
              I have no patience
            </Button>
          </Modal.Footer>
        </Modal>
      ) : //
      null}
    </div>
  );
}

export default InputFiles;
