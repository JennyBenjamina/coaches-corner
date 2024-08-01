import React from "react";
import { useState } from "react";
import InputFiles from "../Components/InputFiles";
import DateComponent from "../Components/DateComponent";
import Category from "../Components/Category";
import { Button, Toast } from "react-bootstrap";
import axiosInstance from "../api/axios";
import EndDate from "../Components/EndDate";

// work onthis later
function Home() {
  // Define state variables for month, year, and file in Home.js
  const [month, setMonth] = useState(1);
  const [year, setYear] = useState(2024);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("men"); // default category
  const [load, setLoad] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [showToast, setShowToast] = useState(false);

  const handleDateChange = (date) => {
    setMonth(date.getMonth() + 1); // getMonth() returns a zero-based month, so add 1
    setYear(date.getFullYear());
  };

  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleEndDateChange = (selectedDate) => {
    const encodedEndDate = encodeURIComponent(
      selectedDate.toISOString().split("T")[0]
    ); // For a Date object, convert to ISO string and keep the date part
    setEndDate(encodedEndDate);
    console.log("selectedDate", encodedEndDate);
  };

  const handleFileUpload = () => {
    if (file) {
      setLoad(true);
      const formData = new FormData();
      formData.append("img", file);
      const description = `${month}-${year}-${category}`;
      formData.append("description", description);
      formData.append("endDate", endDate);

      console.log("category", category);

      axiosInstance
        .post(
          `/api/addfile?month=${month}&year=${year}&category=${category}&endDate=${endDate}`,
          formData
        ) // this was formData
        .then((response) => {
          // handle the response
          setShowToast(true);
          setLoad(false);
        })
        .catch((error) => {
          console.error(error);
          setLoad(false);
        });
    }
  };

  return (
    <>
      <div className="Home container mt-5">
        <div className="Home-left-box">
          <div className="Home-left-top text-center">
            <h2 className="Home-heading">
              Swing Videos <br /> for Coach
            </h2>
          </div>

          <div className="Home files-upload">
            <Category onCategoryChange={handleCategoryChange} />
            <DateComponent onDateChange={handleDateChange} />
            <EndDate onEndDateChange={handleEndDateChange} />
            <InputFiles
              key={load}
              onFileChange={handleFileChange}
              load={load}
              setLoad={setLoad}
            />

            <Toast
              onClose={() => setShowToast(false)}
              show={showToast}
              delay={3000}
              autohide
              bg="warning"
              style={{ marginBottom: "1rem" }}
            >
              <Toast.Header>
                <strong className="mr-auto">Image Upload</strong>
              </Toast.Header>
              <Toast.Body>Successfully Uploaded</Toast.Body>
            </Toast>
            <Button variant="success" type="button" onClick={handleFileUpload}>
              Upload File
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
