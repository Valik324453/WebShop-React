//import "./SearchBar.css";

import { NavLink } from "react-router-dom";
import { BiCart, BiSearch } from "react-icons/bi";
import Badge from "react-bootstrap/Badge";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";

import { auth, db } from "../firebase-config";
import { useContext, useEffect, useState } from "react";
import { ctx } from "./Context";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { v4 } from "uuid";

export default function NavbarC() {
  const [loggedUser, setLoggedUser] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersCart, setUsersCart] = useState(new Map());
  const [cartSize, setCartSize] = useState(0);
  const productsCollectionRef = collection(db, "products");
  const usersCollectionRef = collection(db, "users");

  const { countCartItems, setCountCartItems } = useContext(ctx);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setLoggedUser(currentUser);
    });
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.ig })));
    };

    getUsers();
  }, [countCartItems, loggedUser]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.ig })));
    };

    getUsers();
  }, []);

  useEffect(() => {
    if (loggedUser) {
      users.map((user) => {
        if (user.authId === loggedUser.uid) {
          var result = Object.entries(user.Cart);
          setCartSize(result.length);
        }
      });
    }
  }, [users]);

  const logout = async () => {
    await signOut(auth);
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = products.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <Navbar
      collapseOnSelect
      sticky="top"
      expand="md"
      bg="primary"
      variant="dark"
    >
      <Container>
        <Navbar.Brand href="/WebShop-React">BikeShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/about">About</Nav.Link>
          </Nav>
          <Nav className="me-auto">
            <Form className="d-flex">
              <Form.Control
                size="sm"
                type="search"
                placeholder="Search product name"
                className="me-2"
                aria-label="Search"
                onChange={handleFilter}
              />

              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  <BiSearch />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {Object.keys(filteredData).length > 0 ? (
                    filteredData.slice(0, 15).map((value, key) => {
                      return (
                        <>
                          <Dropdown.Item href={"#/" + value.id} target="_blank">
                            <p>{value.title}</p>
                          </Dropdown.Item>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <Dropdown.Header>Nothing found</Dropdown.Header>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Form>
          </Nav>
          <Nav className="justify-content-end">
            {loggedUser ? (
              <NavDropdown
                title={loggedUser.email}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  eventKey="4.1"
                  onClick={() => {
                    logout();
                    setCountCartItems(v4());
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            )}
          </Nav>
          <Nav>
            <NavLink to="/cart">
              {loggedUser !== null &&
              cartSize !== 0 &&
              loggedUser?.email !== "admin@mail.com" ? (
                <Badge bg="danger">{cartSize}</Badge>
              ) : (
                ""
              )}
              {console.log("loggedUser" + loggedUser)}

              <BiCart style={{ color: "white" }} size={35} />
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  // );
}
