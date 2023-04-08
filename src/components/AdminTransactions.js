import { useEffect, useState } from "react";
import { v4 } from "uuid";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase-config";

import Alert from "react-bootstrap/Alert";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Button } from "react-bootstrap";

export default function Admin() {
  const [loggedUser, setLoggedUser] = useState({});

  const [userCartProducts, setUserCartProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  const usersCollectionRef = collection(db, "users");
  const productsCollectionRef = collection(db, "products");
  const ordersCollectionRef = collection(db, "orders");

  useEffect(() => {
    const getAllOrders = async () => {
      const data = await getDocs(ordersCollectionRef);
      setAllOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAllOrders();
  }, []);

  useEffect(() => {
    const getAllProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setAllProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAllProducts();
  }, []);

  useEffect(() => {
    const getUsersCart = async () => {
      const data = await getDocs(usersCollectionRef);
      setUserCartProducts(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    getUsersCart();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setLoggedUser(currentUser);
    });
  }, []);

  const sortedAllProducts = [...allProducts].sort((a, b) =>
    a.title > b.title ? 1 : -1
  );

  const deleteOrder = async (id) => {
    const productDoc = doc(db, "orders", id);
    await deleteDoc(productDoc);
    window.location.reload(true);
  };

  if (loggedUser?.email === "admin@mail.com") {
    return (
      <div className="indent-after-navbar">
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand>AdminBar</Navbar.Brand>
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/admin">
                Products list
              </NavLink>
              <NavLink className="nav-link" to="/admincreateproduct">
                Create product
              </NavLink>
              <NavLink className="nav-link" to="/admintransactions">
                Orders
              </NavLink>
            </Nav>
          </Container>
        </Navbar>
        <Container>
          {allOrders.map((order) => (
            <div>
              <ListGroup as="ol">
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    {userCartProducts.map((user) => {
                      if (user.id === order.UserId) {
                        return (
                          <>
                            <div className="fw-normal">
                              Order ID: <b>{order.OrderId}</b>
                            </div>
                            <div className="fw-normal">
                              Name: <b>{user.Name}</b> | Email: {user.Email} |
                              Address: {user.Address} | Phone: {user.Phone} |
                              Order Time:{" "}
                              {order.createdAt.toDate().toLocaleString()}
                            </div>
                          </>
                        );
                      }
                    })}

                    <ul>
                      {Object.entries(order.Cart)
                        .sort((a, b) => (a > b ? 1 : -1))
                        .map((p) => (
                          <li>
                            {sortedAllProducts.map((product) => {
                              if (product.id === p[0]) {
                                var sum = 0;
                                return (
                                  <>
                                    <Link to={"/" + product.id}>
                                      {product.title}
                                    </Link>

                                    <p>
                                      <Badge bg="primary" pill>
                                        {p[1]}
                                      </Badge>
                                      * ${product.price} = $
                                      {Number(p[1] * product.price).toFixed(2)}
                                    </p>
                                  </>
                                );
                              }
                            })}
                          </li>
                        ))}
                    </ul>
                    <div className="fw-normal">
                      Total price: $<b>{order.Price.toFixed(2)}</b>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => deleteOrder(order.id)}
                    >
                      Close order
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </div>
          ))}
        </Container>
      </div>
    );
  } else {
    return (
      <Alert key="danger" variant="danger">
        Access denied. Not loggined as admin!
      </Alert>
    );
  }
}
