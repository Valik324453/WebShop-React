import React, { ctx } from "./Context";
import { useEffect, useState, useContext } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { Navigate } from "react-router-dom";
import { v4 } from "uuid";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { Container } from "react-bootstrap";

export default function About() {
  const [loggedUser, setLoggedUser] = useState({});
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [usersCart, setUsersCart] = useState(new Map());
  const [allProducts, setAllProducts] = useState([]);
  const { countCartItems, setCountCartItems } = useContext(ctx);

  const usersCollectionRef = collection(db, "users");
  const productsCollectionRef = collection(db, "products");
  const ordersCollectionRef = collection(db, "orders");

  const [param, setParam] = useState(0);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setLoggedUser(currentUser);
    });
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getAllProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setAllProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getAllProducts();
  }, []);

  useEffect(() => {
    if (loggedUser) {
      users.map((user) => {
        if (user.authId === loggedUser.uid) {
          setUserId(user.id);
          var result = Object.entries(user.Cart);

          for (var i = 0; i < result.length; i++) {
            usersCart.set(result[i][0], result[i][1]);
          }
        }
      });
    }
  }, [users]);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Add 1 more to chart
    </Tooltip>
  );

  const renderTooltip2 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      No more on stock
    </Tooltip>
  );

  const updateCart = async () => {
    const productDoc = doc(db, "users", userId);
    const newFields = { Cart: Object.fromEntries(usersCart) };
    await updateDoc(productDoc, newFields);
    //window.location.reload(true);
  };

  function deleteCart(id) {
    usersCart.delete(id);
    updateCart();
    setParam(v4());
    setCountCartItems(v4());
  }

  const createOrder = async (sum) => {
    await addDoc(ordersCollectionRef, {
      UserId: userId,
      Cart: Object.fromEntries(usersCart),
      Price: sum,
      OrderId: v4().substring(0, 5),
      createdAt: new Date(),
    });
    alert("Thank you for your order! Our manager will contact you soon");
    usersCart.clear();
    updateCart();
    setParam(v4());
  };

  function renderCart(param) {
    if (!loggedUser) {
      return <Navigate replace to="/login" />;
    } else {
      var sum = 0;
      return (
        <div className="indent-after-navbar">
          <Table striped bordered hover>
            <thead>
              <tr style={{ fontSize: 12 }}>
                <th>Model</th>
                <th>Manufact</th>
                <th>Price $</th>
                <th>Quantity</th>
                <th>Price sum</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {usersCart.size > 0
                ? allProducts.map((product) => {
                    for (let [key, value] of usersCart) {
                      if (key === product.id) {
                        sum += parseFloat(
                          Number(product.price * value).toFixed(2)
                        );
                        return (
                          <tr>
                            <td>{product.title}</td>
                            <td>{product.manufacturer}</td>
                            <td> ${Number(product.price).toFixed(2)}</td>
                            <td>
                              {value}{" "}
                              <ButtonGroup size="sm">
                                <Button
                                  onClick={() => {
                                    if (value < 2) {
                                      deleteCart(product.id);
                                    } else {
                                      usersCart.set(
                                        product.id,
                                        usersCart.get(product.id) - 1
                                      );
                                      console.log(usersCart);
                                      updateCart();
                                      setParam(v4());
                                    }
                                  }}
                                >
                                  -
                                </Button>
                                <OverlayTrigger
                                  placement="right"
                                  delay={{ show: 250, hide: 400 }}
                                  overlay={
                                    value < product.stock
                                      ? renderTooltip
                                      : renderTooltip2
                                  }
                                >
                                  <Button
                                    onClick={() => {
                                      if (value < product.stock) {
                                        usersCart.set(
                                          product.id,
                                          usersCart.get(product.id) + 1
                                        );
                                        console.log(usersCart);
                                        updateCart();
                                        setParam(v4());
                                      }
                                    }}
                                  >
                                    +
                                  </Button>
                                </OverlayTrigger>
                              </ButtonGroup>
                            </td>
                            <td>${Number(product.price * value).toFixed(2)}</td>
                            <td>
                              {" "}
                              <Button
                                onClick={() => {
                                  deleteCart(product.id);
                                }}
                              >
                                Remove
                              </Button>
                            </td>
                          </tr>
                        );
                      }
                    }
                  })
                : "Cart is empty"}
            </tbody>
          </Table>

          <p>Total price: {Number(sum).toFixed(2)}</p>

          <Button
            onClick={() => {
              createOrder(sum);
            }}
          >
            Order
          </Button>
        </div>
      );
    }
  }
  return <Container>{renderCart(param)}</Container>;
}
