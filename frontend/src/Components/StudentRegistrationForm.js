import React, { useEffect, useState, useLayoutEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";
import axiosInstance from "../api/axios";

const StudentRegistrationForm = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const refresh = useRefreshToken();
  const [image, setImage] = useState("https://via.placeholder.com/100");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    startDate: "",
    handicap: 0,
    email: "",
    yearsPlayed: 0,
    homeCourse: "",
    takenLessons: false,
    whatToImprove: "",
  });

  useEffect(() => {
    refresh();
    axiosPrivate
      .get(`/students/${auth.id}`)
      .then((response) => {
        setFormData(response.data);
        console.log("formData", formData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const data = new FormData();
      data.append("file", file);
      setImage(URL.createObjectURL(file));
      axiosInstance
        .post(`/api/addfile?imgId=${auth.id}`, data)
        .then((response) => {
          console.log(response);
        });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formImage">
          <Form.Label>Profile Image</Form.Label>
          <div>
            {image ? (
              <img
                src={image}
                alt="Profile"
                onClick={() => document.getElementById("imageUpload").click()}
                style={{
                  cursor: "pointer",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <Button
                onClick={() => document.getElementById("imageUpload").click()}
              >
                Upload Image
              </Button>
            )}
            <Form.Control
              type="file"
              id="imageUpload"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </Form.Group>

        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            className="form-control-custom"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            maxLength="20"
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            className="form-control-custom"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formStartDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            className="form-control-custom"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formHandicap">
          <Form.Label>Handicap</Form.Label>
          <Form.Control
            className="form-control-custom"
            type="number"
            name="handicap"
            value={formData.handicap}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="form-control-custom"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formYearsPlayed">
          <Form.Label>Years Played</Form.Label>
          <Form.Control
            className="form-control-custom"
            type="number"
            name="yearsPlayed"
            value={formData.yearsPlayed}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formHomeCourse">
          <Form.Label>Home Course</Form.Label>
          <Form.Control
            className="form-control-custom"
            type="text"
            name="homeCourse"
            value={formData.homeCourse}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formTakenLessons">
          <Form.Check
            type="checkbox"
            label="Taken Lessons"
            name="takenLessons"
            checked={formData.takenLessons}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formWhatToImprove">
          <Form.Label>What to Improve</Form.Label>
          <Form.Control
            className="form-control-custom"
            type="text"
            name="whatToImprove"
            value={formData.whatToImprove}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="custom" type="submit" className="btn-custom">
          Save
        </Button>
      </Form>
    </Container>
  );
};

export default StudentRegistrationForm;
