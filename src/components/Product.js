import { useEffect, useState, useContext } from "react";
import { ctx } from "./Context";
import { useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase-config";
import { v4 } from "uuid";

import {
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function Product() {
  let { id } = useParams();

  const [disable, setDisable] = useState(false);
  const [buttonText, setButtonText] = useState("Add to cart");
  let checkCart;

  const [loggedUser, setLoggedUser] = useState({});
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  const [product, setProduct] = useState([]);
  const [usersCart, setUsersCart] = useState(new Map());
  const { countCartItems, setCountCartItems } = useContext(ctx);

  const uploadToFirestore = async () => {
    const productDoc = doc(db, "users", userId);
    const newFields = { Cart: Object.fromEntries(usersCart) };
    await updateDoc(productDoc, newFields);
    //window.location.reload(true);
  };

  function handleClick() {
    setButtonText("Already in Cart");
  }

  function outOfStockButton() {
    setButtonText("Out of stock");
  }

  function noUserLoged() {
    setButtonText("Please login to continue");
  }

  function alreadyIn() {
    if (usersCart.has(id)) {
      checkCart = id;
      return checkCart;
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      const docRef = doc(db, "products", id);
      const data = await getDoc(docRef);
      setProduct(data.data());
    };
    getProducts();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setLoggedUser(currentUser);
    });
  }, []);

  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
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

  useEffect(() => {
    if (loggedUser) {
      if (alreadyIn() !== undefined) {
        setDisable(true);
        handleClick();
      }
      if (product.stock < 1) {
        setDisable(true);
        outOfStockButton();
      }
    } else {
      setDisable(true);
      noUserLoged();
    }
  });

  return (
    <>
      <Container>
        {product !== undefined && loggedUser !== undefined ? (
          <Row className="text-center">
            <Col lg={6} sm={12}>
              <Image src={product.img} fluid></Image>
            </Col>
            <Col style={{ padding: "10vw 0" }} lg={6} sm={12}>
              <h1>
                {product.title} / {product.manufacturer}
              </h1>
              <p>{product.description}</p>
              <b>${product.price}</b>
              <p>
                <Button
                  disabled={disable}
                  onClick={() => {
                    usersCart.set(id, 1);
                    uploadToFirestore();
                    setDisable(true);
                    handleClick();
                    setCountCartItems(v4());
                  }}
                  variant="primary"
                >
                  {buttonText}
                </Button>
              </p>
            </Col>
          </Row>
        ) : (
          "Loading results..."
        )}
      </Container>
    </>
  );
}
