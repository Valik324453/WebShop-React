import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export default function About() {
  return (
    <div className="indent-after-navbar">
      <Image
        fluid
        width="100%"
        src="https://www.sefiles.net/merchant/4560/images/site/old-town-bike-shop-banner.jpg"
      ></Image>

      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>BikeShop</Card.Title>
          <Card.Text>
            We opened The BikeShop in 1998 in a 500 square-foot space on a
            shoestring budget in Tustin, California. Back then there was barely
            enough room to set up a repair stand, but over the years The Path
            has expanded as neighboring suites have opened up in our building.
          </Card.Text>
          <Card.Text>
            In 2009 we moved our retail store into its current location in the
            building next door. Today, the original shop space is used for
            storage, and our retail store is now approximately 5,000 square
            feet.
          </Card.Text>
          <Card.Text>
            In October 2012, we opened a second location in Trabuco Canyon,
            California. The Path Bike Shop Live Oak is located near popular
            Orange County trails, including the Luge. It's slightly smaller than
            our Tustin store, but is still well stocked and has a full-service
            repair department.
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            <b>Address:</b>
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Sacramento, California
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            Pushkin street, Colotushkin house 1
          </Card.Subtitle>
        </Card.Body>
      </Card>
    </div>
  );
}
