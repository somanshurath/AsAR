import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>GetHired</h5>
                        <p className="small">
                            Helping you grow your career with personalized learning paths.
                        </p>
                    </Col>
                    <Col md={4}>
                        <h5>Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-white">Home</a></li>
                            <li><a href="/courses" className="text-white">Courses</a></li>
                            <li><a href="/assessment" className="text-white">Skill Assessment</a></li>
                            <li><a href="/about" className="text-white">About Us</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Contact</h5>
                        <p className="small">
                            Email: info@gethired.edu<br />
                            Address: BITS Goa
                        </p>
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        <p className="text-center small mb-0">
                            © {new Date().getFullYear()} GetHired. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
