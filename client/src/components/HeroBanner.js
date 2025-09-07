import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { learning } from '../assets/logo.js';

const HeroBanner = () => {
    return (
        <div className="bg-primary text-white py-5">
            <Container>
                <Row className="align-items-center">
                    <Col md={7}>
                        <h1 className="display-4 fw-bold">Discover Your Learning Path</h1>
                        <p className="lead mb-4">
                            Take our skill assessment to find personalized course recommendations
                            that match your current abilities and career goals.
                        </p>
                        <div className="d-flex gap-3">
                            <Button
                                as={Link}
                                to="/assessment"
                                variant="light"
                                size="lg"
                            >
                                Take Skill Assessment
                            </Button>
                            <Button
                                as={Link}
                                to="/courses"
                                variant="outline-light"
                                size="lg"
                            >
                                Browse Courses
                            </Button>
                        </div>
                    </Col>
                    <Col md={5} className="d-none d-md-block">
                        <img
                            src={learning}
                            alt="Learning Journey"
                            className="img-fluid rounded shadow"
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HeroBanner;
