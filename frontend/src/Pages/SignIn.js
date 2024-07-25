import { useRef, useState, useEffect } from "react";
import { Container, Alert, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
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
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const isAuthenticated = response?.data?.isAuthenticated;
      setAuth({ user, pwd, roles, accessToken, isAuthenticated });
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
      <Container className="mt-5" style={{ maxWidth: "500px" }}>
        {errMsg && (
          <Alert variant="danger" ref={errRef} aria-live="assertive">
            {errMsg}
          </Alert>
        )}
        <h1>Sign In</h1>
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
          <Button variant="primary" type="submit">
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
