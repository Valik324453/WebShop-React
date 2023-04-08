import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../firebase-config";
import Alert from "react-bootstrap/Alert";
import { NavLink } from "react-router-dom";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Overlay from "react-bootstrap/Overlay";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import InputGroup from "react-bootstrap/InputGroup";
import Ratio from "react-bootstrap/Ratio";
import Card from "react-bootstrap/Card";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function Admin() {
  const [loggedUser, setLoggedUser] = useState({});

  const productsCollectionRef = collection(db, "products");

  const [newTitle, setNewTitle] = useState("");
  const [newStock, setNewStock] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [newManufacturer, setNewManufacturer] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const [products, setProducts] = useState([]);

  const [file, setFile] = useState(""); // progress
  const [percent, setPercent] = useState(0); // Handle file upload event and update state
  const [imgUrl, setImgUrl] = useState("");
  const [param, setParam] = useState(0);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpload = (id) => {
    if (!file) {
      alert("Please upload an image first!");
    }
    const productDoc = doc(db, "products", id);
    var newFields = { img: "" };
    const storageRef = ref(storage, `/image/${v4()}${file.name}`); // progress can be paused and resumed. It also exposes progress updates. // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl(url);
          newFields = { img: url };
          updateDoc(productDoc, newFields).then(() => {
            window.location.reload(true);
          });
        });
      }
    );
  };

  const createProduct = async () => {
    await addDoc(productsCollectionRef, {
      title: newTitle,
      stock: Number(newStock),
      price: Number(newPrice),
      manufacturer: newManufacturer,
      description: newDescription,
      img: imgUrl
        ? imgUrl
        : "https://firebasestorage.googleapis.com/v0/b/fir-test-b5004.appspot.com/o/image%2Fphoto-coming-%20soon.jpg?alt=media&token=b321cba5-05f8-4678-a28a-ff6444ff945f",
    });
    window.location.reload(true);
  };

  const updateTitle = async (id) => {
    const newTitle = prompt("Enter new title:");
    const productDoc = doc(db, "products", id);
    const newFields = { title: newTitle };
    await updateDoc(productDoc, newFields);
    window.location.reload(true);
  };

  const updateManufacturer = async (id) => {
    const newManufacturer = prompt("Enter new manufacturer:");
    const productDoc = doc(db, "products", id);
    const newFields = { manufacturer: newManufacturer };
    await updateDoc(productDoc, newFields);
    window.location.reload(true);
  };

  const updatePrice = async (id) => {
    const newPrice = prompt("Enter new price:");
    const productDoc = doc(db, "products", id);
    const newFields = { price: newPrice };
    await updateDoc(productDoc, newFields);
    window.location.reload(true);
  };

  const updateStock = async (id) => {
    const newStock = prompt("Enter new price:");
    const productDoc = doc(db, "products", id);
    const newFields = { stock: newStock };
    await updateDoc(productDoc, newFields);
    window.location.reload(true);
  };

  const updateDescription = async (id) => {
    const newDescription = prompt("Enter new description:");
    const productDoc = doc(db, "products", id);
    const newFields = { description: newDescription };
    await updateDoc(productDoc, newFields);
    window.location.reload(true);
  };

  const deleteProduct = async (id) => {
    const productDoc = doc(db, "products", id);
    await deleteDoc(productDoc);
    window.location.reload(true);
  };
  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getProducts();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setLoggedUser(currentUser);
    });
  }, []);

  function renderAdmin(param) {
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
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Model</th>
                  <th>Manufacturer</th>
                  <th>Price $</th>
                  <th>Quantity</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  return (
                    <tr>
                      <td>
                        {product.title}
                        <br />

                        <Button
                          onClick={() => {
                            updateTitle(product.id);
                            setParam(v4());
                          }}
                          variant="outline-secondary"
                        >
                          Update Title
                        </Button>
                      </td>
                      <td>
                        {product.manufacturer}
                        <br />

                        <Button
                          onClick={() => {
                            updateManufacturer(product.id);
                          }}
                          variant="outline-secondary"
                        >
                          Update Manufacturer
                        </Button>
                      </td>
                      <td>
                        ${Number(product.price).toFixed(2)}
                        <br />
                        <Button
                          onClick={() => {
                            updatePrice(product.id);
                          }}
                          variant="outline-secondary"
                        >
                          Update Price
                        </Button>
                      </td>
                      <td>
                        {product.stock} <br />
                        <Button
                          onClick={() => {
                            updateStock(product.id);
                          }}
                          variant="outline-secondary"
                        >
                          Update Stock
                        </Button>
                      </td>
                      <td>
                        {product.description} <br />
                        <Button
                          onClick={() => {
                            updateDescription(product.id);
                          }}
                          variant="outline-secondary"
                        >
                          Update Description
                        </Button>
                      </td>
                      <td>
                        <Container>
                          <Row className="align-items-center">
                            <Card
                              id="update-products"
                              className="card mb-4 border-0"
                              animation="glow"
                              style={{ width: "15vw" }}
                            >
                              <br />
                              <img
                                id="update-products-img"
                                height="200px"
                                src={product.img}
                              ></img>
                            </Card>

                            <Card
                              id="update-products-images"
                              className="card mb-4 border-0"
                              animation="glow"
                              style={{ width: "20vw" }}
                            >
                              <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload image</Form.Label>
                                <Form.Control
                                  type="file"
                                  onChange={handleChange}
                                  accept="/image/*"
                                />
                              </Form.Group>
                              <Button
                                onClick={() => handleUpload(product.id)}
                                variant="outline-secondary"
                                width="50%"
                              >
                                Upload to Firebase
                              </Button>
                            </Card>
                          </Row>
                        </Container>
                      </td>
                      <td>
                        <br />{" "}
                        <Button
                          variant="outline-danger"
                          onClick={() => deleteProduct(product.id)}
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
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
  return <Container>{renderAdmin(param)}</Container>;
}
