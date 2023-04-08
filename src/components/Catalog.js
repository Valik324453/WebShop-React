import React, { useContext, useEffect, useState } from "react";
import { ctx } from "./Context";
import Badge from "react-bootstrap/Badge";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";

import { db } from "../firebase-config";
import { getDocs, collection } from "firebase/firestore";

export default function Catalog() {
  const { items, setItems } = useContext(ctx);
  const [param, setParam] = useState(0);

  const [filter, setFilter] = useState("all");
  const [temp, setTemp] = useState([]);
  const [itemsList, setitemsList] = useState([]);

  const [products, setProducts] = useState([]);
  const productsCollectionRef = collection(db, "products");

  useEffect(() => {
    const getProducts = async () => {
      const data = await getDocs(productsCollectionRef);
      setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getProducts();
  }, []);

  useEffect(() => {
    console.log("two");
    console.log("products: " + products + "!!!");
    setItems(products);
    setitemsList(products);
    console.log("items: " + items + "!!!");
  }, [products]);

  useEffect(() => {
    console.log("three");
    setitemsList(products);
    setTemp(itemsList);
    setitemsList(items);
  }, [itemsList]);

  useEffect(() => {
    console.log("four");
    if (filter === "All") {
      setTemp(itemsList);
    } else {
      setTemp(itemsList.filter((item) => item.manufacturer === filter));
    }
    console.log("temp: " + temp + "!!!");
  }, [filter]);

  function openProduct(id) {
    var myLink = "#/" + id;
    window.location.hash = myLink;
  }

  function renderSwitch(param) {
    switch (param) {
      case 0:
        return [...temp]
          .sort((b, a) => a.price - b.price)
          .map((product) => {
            return (
              <Col xs={12} sm={6} md={3}>
                <br />
                <Row style={{ padding: "10px" }}>
                  <Card>
                    <Card.Header>
                      {product.title}
                      &nbsp;
                      {product.stock < 1 ? (
                        <Badge bg="danger">Out of stock</Badge>
                      ) : (
                        ""
                      )}
                    </Card.Header>
                    <Card.Img variant="top" src={product.img} fluid />
                    <Card.Body>
                      <Card.Title>${product.price}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Manufacturer: {product.manufacturer}
                      </Card.Subtitle>
                      <Button
                        onClick={() => {
                          openProduct(product.id);
                        }}
                        variant="primary"
                      >
                        Show details
                      </Button>
                    </Card.Body>
                  </Card>
                </Row>
              </Col>
            );
          });

      default:
        return [...temp]
          .sort((a, b) => a.price - b.price)
          .map((product) => {
            return (
              <Col xs={12} sm={6} md={3}>
                <br />
                <Row style={{ padding: "10px" }}>
                  <Card>
                    <Card.Header>
                      {product.title}
                      &nbsp;
                      {product.stock < 1 ? (
                        <Badge bg="danger">Out of stock</Badge>
                      ) : (
                        ""
                      )}
                    </Card.Header>
                    <Card.Img variant="top" src={product.img} fluid />
                    <Card.Body>
                      <Card.Title>${product.price}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Manufacturer: {product.manufacturer}
                      </Card.Subtitle>
                      <Button
                        onClick={() => {
                          openProduct(product.id);
                        }}
                        variant="primary"
                      >
                        Show details
                      </Button>
                    </Card.Body>
                  </Card>
                </Row>
              </Col>
            );
          });
    }
  }

  return (
    <div className="indent-after-navbar">
      <Image
        fluid
        src="https://i0.wp.com/www.playhooky.fr/wp-content/uploads/2019/01/Playhooky.fr-Le%CC%81volution-de-la-bicyclette.png?fit=2448%2C920&ssl"
      ></Image>
      <Carousel>
        <Carousel.Item interval={1000}>
          <div class="img_wrap">
            <img
              src="https://www.bikeshop.md/public/sliders/c86bc43dfb206aeba772c34b54776006.jpg"
              alt="First slide"
              fluid
            />
          </div>
          <Carousel.Caption
            style={{
              backgroundColor: "black",
              opacity: "0.4",
            }}
          >
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <div class="img_wrap">
            <img
              className="mw-100 d-block"
              src="https://images.unsplash.com/photo-1517649763962-0c623066013b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y3ljbGluZyUyMHJhY2V8ZW58MHx8MHx8&w=1000&q=80"
              alt="Second slide"
            />
          </div>
          <Carousel.Caption
            style={{
              backgroundColor: "black",
              opacity: "0.6",
            }}
          >
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <div class="img_wrap">
            <img
              className="d-block w-15"
              src="https://www.bikeshop.md/public/im/3.jpg"
              alt="Third slide"
            />
          </div>
          <Carousel.Caption
            style={{
              backgroundColor: "black",
              opacity: "0.6",
            }}
          >
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container className="sort-and-filter">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <p>
              <b>Filter</b> by manufacturer:
            </p>
          </Col>
          <Col md="auto">
            <Form.Select
              size="sm"
              aria-label="Default select example"
              className="select-filter"
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
            >
              <option value="All">All</option>
              <option value="Giant">Giant</option>
              <option value="Redline">Redline</option>
              <option value="Bicyclette">Bicyclette</option>
            </Form.Select>
          </Col>
          <Col md="auto">
            <p>
              <b>Sort</b> by price:
            </p>
          </Col>
          <Col md="auto">
            <ButtonGroup size="sm">
              <Button onClick={() => setParam(0)}>Desc</Button>
              <Button onClick={() => setParam(1)}>Asc</Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>{renderSwitch(param)}</Row>
      </Container>
    </div>
  );
}
