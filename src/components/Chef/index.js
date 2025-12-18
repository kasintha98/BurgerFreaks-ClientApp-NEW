import React from "react";
import { CardGroup, Card } from "react-bootstrap";
import sathish from "../../img/sathish.jpg";
import supun from "../../img/supun.jpg";
import deshitha from "../../img/deshitha.jpg";

export default function index() {
  return (
    <div>
      <div className="text-center">
        <br></br>
        <br></br>
        <br></br>
        <h2>Meet Our Chefs</h2>
        <br></br>
        <br></br>
      </div>
      <CardGroup>
        <Card>
          <Card.Img variant="top" src={sathish} />
          <Card.Body>
            <Card.Title>
              <div className="text-center">Sathish Suharsha</div>
            </Card.Title>
            <Card.Text>
              Detail-oriented Chef with 2+ years of experience in high-standard kitchens. Passionate about artistic plating, precision cooking, and innovative flavor profiles. Dedicated to maintaining impeccable quality and hygiene while thriving in high-pressure, creative culinary environments.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src={supun} />
          <Card.Body>
            <Card.Title>
              <div className="text-center">Supun Dhananjaya</div>
            </Card.Title>
            <Card.Text>
              Talented culinary professional with over two years of experience elevating seasonal ingredients. Committed to modern techniques and exquisite presentation. A disciplined team player ready to contribute strong knife skills and a relentless work ethic to a top-tier brigade.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Img variant="top" src={deshitha} />
          <Card.Body>
            <Card.Title>
              <div className="text-center">Deshitha Perera</div>
            </Card.Title>
            <Card.Text>
              Ambitious Chef with 3+ years of experience refining modern culinary techniques. Thrives in fast-paced, exacting environments. Focused on delivering sophisticated tasting menus with consistency and flair. Eager to bring creativity and operational discipline to an award-winning team.
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
    </div>
  );
}
