import { useRef, useState, useEffect } from "react";
import { Container, Alert, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axiosInstance from "../api/axios";
const LOGIN_URL = "/auth";

const SignIn = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef(null);
  const errRef = useRef(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("data", JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const isAuthenticated = response?.data?.isAuthenticated;
      const id = response?.data?.id;
      const email = response?.data?.email;
      const handicap = response?.data?.handicap;
      const homeCourse = response?.data?.homeCourse;
      const startDate = response?.data?.startDate;
      const takenLessons = response?.data?.takenLessons;
      const username = response?.data?.username;
      const whatToImprove = response?.data?.whatToImprove;
      const yearsPlayed = response?.data?.yearsPlayed;
      console.log("response", response?.data);
      setAuth({
        user,
        pwd,
        roles,
        accessToken,
        isAuthenticated,
        id,
        email,
        handicap,
        homeCourse,
        startDate,
        takenLessons,
        username,
        whatToImprove,
        yearsPlayed,
      });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      // so screen reader can read the error message
      if (errRef.current) {
        errRef.current.focus();
      }
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <>
      <Container
        className="mt-5 login_register_container"
        style={{ maxWidth: "500px" }}
      >
        {errMsg && (
          <Alert variant="danger" ref={errRef} aria-live="assertive">
            {errMsg}
          </Alert>
        )}
        <h1 className="heading">Sign In</h1>
        <hr />
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
          </Form.Group>
          <Button variant="custom" className="btn-custom my-3" type="submit">
            Sign In
          </Button>
          <div className="persistCheck">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="persist">Trust This Device?</label>
          </div>
        </Form>
        <p className="mt-3">
          Need an Account?
          <br />
          <span className="line">
            {/*put router link here*/}
            <a href="/Register">Sign Up</a>
          </span>
        </p>
      </Container>
    </>
  );
};

export default SignIn;
