import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const OutputDisplay = ({ title, content }) => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col className="d-flex justify-content-center">
          <Card
            style={{ width: "auto", minWidth: "200px" }}
            className="flex-grow-1"
          >
            <Card.Body>
              <Card.Title className="d-inline-flex">{title}</Card.Title>
              <Card.Text>{content}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OutputDisplay;
