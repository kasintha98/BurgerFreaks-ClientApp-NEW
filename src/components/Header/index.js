import React, { useState, useEffect } from "react";
import {
  Navbar,
  Nav,
  Dropdown,
  DropdownButton,
  Container,
} from "react-bootstrap";
import "./style.css";
import NewModal from "../Modal";
import Input from "../Input";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../img/logo.jpg";
import { login, signout } from "../../actions";
import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import { useScrollSection } from "react-scroll-section";
import CartNum from "../UI/CartNum";
import { ToastContainer } from "react-toastify";

export default function Header(props) {
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  //calling action to login the user
  const userLogin = () => {
    dispatch(login({ email, password }))
      .then(() => {
        console.log({ auth: auth });
        setLoginModal(false);
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  //calling the action to logout the user
  const logout = () => {
    dispatch(signout())
      .then(() => {
        // Logout successful
        history.push("/");
      })
      .catch((error) => {
        console.log({ error });
        history.push("/");
      });
  };

  //go to profile page
  const goToProfile = () => {
    console.log("Go to profile");
    // Clear hash before navigating
    if (window.location.hash) {
      window.history.replaceState(null, null, window.location.pathname);
    }
    history.push("/profile");
  }

  const homeSection = useScrollSection("home");
  const aboutSection = useScrollSection("about");
  const chefSection = useScrollSection("chef");
  const menuSection = useScrollSection("menu");
  const contactSection = useScrollSection("contact");

  // Map section names to section objects
  const sectionMap = {
    about: aboutSection,
    chef: chefSection,
    menu: menuSection,
    contact: contactSection,
    home: homeSection,
  };

  // Handle section scrolling based on URL hash
  useEffect(() => {
    if (location.pathname === "/") {
      // Get the hash from the URL (e.g., #about from /#about)
      const hash = window.location.hash.replace("#", "");
      if (hash && sectionMap[hash]) {
        setTimeout(() => {
          sectionMap[hash].onClick();
        }, 100);
      }
    } else {
      // Clear hash when navigating away from home
      if (window.location.hash) {
        window.history.replaceState(null, null, window.location.pathname);
      }
    }
  }, [location.pathname]);

  // Handle clicking on section links
  const handleSectionClick = (sectionName) => {
    if (location.pathname !== "/") {
      // Navigate to home with hash
      history.push(`/#${sectionName}`);
    } else {
      // Already on home, just scroll
      sectionMap[sectionName].onClick();
    }
  };

  const renderLoggedInMenu = () => {
    return (
      <>
        <NavLink
          className="nav-link"
          to="/"
          onClick={homeSection.onClick}
          selected={homeSection.selected}
        >
          Home
        </NavLink>
        <Nav.Link
          onClick={() => handleSectionClick("about")}
          selected={aboutSection.selected}
        >
          About
        </Nav.Link>
        <Nav.Link
          className="nav-link"
          onClick={() => handleSectionClick("chef")}
          selected={chefSection.selected}
        >
          Chef
        </Nav.Link>
        <Nav.Link
          className="nav-link"
          onClick={() => handleSectionClick("menu")}
          selected={menuSection.selected}
        >
          Menu
        </Nav.Link>
        <Nav.Link
          className="nav-link"
          onClick={() => handleSectionClick("contact")}
          selected={contactSection.selected}
        >
          Contact
        </Nav.Link>
        <NavLink className="nav-link" to="/cart">
          {Object.keys(cart.cartItems).length > 0 ? (
            <CartNum count={Object.keys(cart.cartItems).length}></CartNum>
          ) : (
            <CartNum count={0}></CartNum>
          )}
          <i className="fa fa-cart-plus"></i> Cart
        </NavLink>
        <DropdownButton title={`${auth.user.fullName}`} variant="dark">
          <Dropdown.Item key="profile" onClick={() => goToProfile()}>
            <i className="fa fa-id-badge"></i> Profile
          </Dropdown.Item>
          <Dropdown.Item key="logout" onClick={() => logout()}>
            <i className="fa fa-sign-out"></i> Logout
          </Dropdown.Item>
        </DropdownButton>
      </>
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <>
        <NavLink className="nav-link" to="/">
          Home
        </NavLink>
        <Nav.Link
          onClick={() => handleSectionClick("about")}
          selected={aboutSection.selected}
        >
          About
        </Nav.Link>
        <Nav.Link
          className="nav-link"
          onClick={() => handleSectionClick("chef")}
          selected={chefSection.selected}
        >
          Chef
        </Nav.Link>
        <Nav.Link
          className="nav-link"
          onClick={() => handleSectionClick("menu")}
          selected={menuSection.selected}
        >
          Menu
        </Nav.Link>
        <Nav.Link
          className="nav-link"
          onClick={() => handleSectionClick("contact")}
          selected={contactSection.selected}
        >
          Contact
        </Nav.Link>
        <Nav.Link
          onClick={() => {
            setLoginModal(true);
          }}
        >
          Login
        </Nav.Link>
        <NavLink className="nav-link" to="/cart">
          {Object.keys(cart.cartItems) ? (
            <CartNum count={Object.keys(cart.cartItems).length}></CartNum>
          ) : null}
          <i className="fa fa-cart-plus"></i> Cart
        </NavLink>
      </>
    );
  };

  const renderLoginModal = () => {
    return (
      <NewModal
        size="lg"
        modalTitle="Login"
        variant="primary"
        action={userLogin}
        saveBtnName="Login"
        show={loginModal}
        handleClose={() => {
          setLoginModal(false);
        }}
        log={true}
      >
        <Input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          lable="Email"
          type="text"
          placeholder="Enter your email..."
        ></Input>
        <Input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          lable="Password"
          type="password"
          placeholder="Enter your password..."
        ></Input>
      </NewModal>
    );
  };

  return (
    <div>
      <ToastContainer />
      <Navbar fixed="top" bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <img width="40px" src={logo} alt="logo" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0 justify-content-end"
              style={{ maxHeight: "200px", width: "100%" }}
              navbarScroll
            >
              {auth.authenticate
                ? renderLoggedInMenu()
                : renderNonLoggedInMenu()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {renderLoginModal()}
    </div>
  );
}
