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

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUploadOnCreateProduct = (id) => {
    if (!file) {
      alert("Please upload an image first!");
    }
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
    alert("Product created");
    window.location.reload(true);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setLoggedUser(currentUser);
    });
  }, []);
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
          <Row className="align-items-center">
            <Card
              id="create-productileft-input-fields"
              className="card mb-4 border-0"
              animation="glow"
              style={{ width: "40vw" }}
            >
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Title
                </InputGroup.Text>
                <Form.Control
                  onChange={(event) => {
                    setNewTitle(event.target.value);
                  }}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Stock
                </InputGroup.Text>
                <Form.Control
                  onChange={(event) => {
                    setNewStock(event.target.value);
                  }}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Price
                </InputGroup.Text>
                <Form.Control
                  onChange={(event) => {
                    setNewPrice(event.target.value);
                  }}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Manufacturer
                </InputGroup.Text>
                <Form.Control
                  onChange={(event) => {
                    setNewManufacturer(event.target.value);
                  }}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Description
                </InputGroup.Text>
                <Form.Control
                  onChange={(event) => {
                    setNewDescription(event.target.value);
                  }}
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </InputGroup>
              <Button variant="secondary" size="lg" onClick={createProduct}>
                Create product
              </Button>
            </Card>
            <Card
              className="card mb-4 border-0"
              animation="glow"
              style={{ width: "45vw" }}
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
                onClick={handleUploadOnCreateProduct}
                variant="outline-secondary"
              >
                Upload to Firebase
              </Button>
              <p>{percent} "% done"</p>

              <div style={{ width: "auto", height: "auto" }}>
                <Ratio aspectRatio="16x9">
                  <embed type="image/svg+xml" src={imgUrl} />
                </Ratio>
              </div>
            </Card>
          </Row>
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
