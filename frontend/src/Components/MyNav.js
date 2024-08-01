import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import useAuth from "../hooks/useAuth";

import logoImage from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const MyNav = () => {
  const { auth, isAuthorized } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate("/signin");
  };
  return (
    <>
      <Navbar className="navbar-custom " expand="lg">
        <Container
          className={
            isAuthorized([2001, 1984, 5150])
              ? "justify-content-center"
              : "flex-column justify-content-center"
          }
        >
          <Navbar.Brand
            href="https://JennyLee.Golf"
            target="_blank"
            style={{ cursor: "pointer" }}
          >
            <img
              src={logoImage}
              alt="logo"
              style={{ height: "100px", width: "100px" }}
            />
          </Navbar.Brand>
          {isAuthorized([2001, 1984, 5150]) && (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-around"
              >
                <Nav>
                  <LinkContainer to="/" style={{ cursor: "pointer" }}>
                    <Nav.Link>Home</Nav.Link>
                  </LinkContainer>
                  <LinkContainer
                    to="/mens_events"
                    style={{ cursor: "pointer" }}
                  >
                    <Nav.Link>Men</Nav.Link>
                  </LinkContainer>
                  <LinkContainer
                    to="/womens_events"
                    style={{ cursor: "pointer" }}
                  >
                    <Nav.Link>Women</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/etiquette" style={{ cursor: "pointer" }}>
                    <Nav.Link>Course Etiquette</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/misc" style={{ cursor: "pointer" }}>
                    <Nav.Link>Misc</Nav.Link>
                  </LinkContainer>
                </Nav>
                <Nav className="last-nav">
                  <LinkContainer
                    to="/signin"
                    onClick={signOut}
                    style={{ cursor: "pointer" }}
                  >
                    <Nav.Link>Sign Out</Nav.Link>
                  </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default MyNav;
