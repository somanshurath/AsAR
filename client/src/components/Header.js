import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { logo } from '../assets/logo.js';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <Navbar
            expand="lg"
            className={`${scrolled ? 'bg-white py-2' : 'bg-light py-3'} fixed-top transition-all shadow-sm`}
            style={{ transition: 'all 0.3s ease' }}
        >
            <Container>
                <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
                    <img
                        src={logo}
                        alt="GetHired Logo"
                        height="40"
                        className="d-inline-block align-top me-2"
                    />
                    <span className="fw-bold">GetHired</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link
                            as={Link}
                            to="/"
                            className={`mx-2 ${isActive('/') ? 'fw-bold border-bottom border-primary' : ''}`}
                        >
                            Home
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/courses"
                            className={`mx-2 ${isActive('/courses') ? 'fw-bold border-bottom border-primary' : ''}`}
                        >
                            Courses
                        </Nav.Link>
                        {/* <Dropdown as={Nav.Item} className="mx-2">
                            <Dropdown.Toggle
                                as={Nav.Link}
                                className={`mx-2 bg-transparent border-0 p-0 d-flex align-items-center ${isTrackActive() ? 'fw-bold border-bottom border-primary' : ''}`}
                                style={{ paddingTop: '8px', paddingBottom: '8px' }}
                            >
                                Learning Tracks <FaChevronDown className="ms-1 dropdown-icon" size={12} />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/tracks/data-science">Data Science</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/tracks/full-stack">Full Stack Development</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/tracks/cloud-devops">Cloud & DevOps</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown> */}
                        <Nav.Link
                            as={Link}
                            to="/about"
                            className={`mx-2 ${isActive('/about') ? 'fw-bold border-bottom border-primary' : ''}`}
                        >
                            About Us
                        </Nav.Link>
                    </Nav>
                    <div className="d-flex align-items-center">
                        <Button
                            as={Link}
                            to="/assessment"
                            variant="primary"
                            className="rounded-pill px-4 py-2 fw-semibold"
                        >
                            Take Skill Assessment
                        </Button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
