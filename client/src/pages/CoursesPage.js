import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Form, InputGroup, Accordion, ProgressBar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaSearch, FaStar, FaUsers, FaClock, FaLaptopCode, FaTools, FaChevronRight } from 'react-icons/fa';
import courses from '../data/courses';
import { learning } from '../assets/logo';

const CoursesPage = () => {
    const [filteredCourses, setFilteredCourses] = useState(courses);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');

    const categories = [
        { value: 'all', label: 'All Categories' },
        { value: 'data_science', label: 'Data Science & AI' },
        { value: 'full_stack', label: 'Full Stack Development' },
        { value: 'cloud_devops', label: 'Cloud & DevOps' }
    ];

    const levels = [
        { value: 'all', label: 'All Levels' },
        { value: 'Beginner', label: 'Beginner' },
        { value: 'Intermediate', label: 'Intermediate' },
        { value: 'Advanced', label: 'Advanced' },
        { value: 'Intermediate to Advanced', label: 'Intermediate to Advanced' }
    ];

    // Filter courses based on search term and filters
    useEffect(() => {
        let result = courses;

        if (searchTerm) {
            result = result.filter(course =>
                course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.provider.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            result = result.filter(course => course.category === selectedCategory);
        }

        if (selectedLevel !== 'all') {
            result = result.filter(course => course.level.includes(selectedLevel));
        }

        setFilteredCourses(result);
    }, [searchTerm, selectedCategory, selectedLevel]);

    return (
        <div className="courses-page">
            {/* Hero Section */}
            <div className="gradient-bg py-5 mb-5">
                <Container>
                    <Row className="align-items-center">
                        <Col lg={7} className="text-white">
                            <h1 className="display-5 fw-bold mb-4">Discover Your Path to Success</h1>
                            <p className="lead mb-4">
                                Explore our comprehensive catalog of courses designed to help you master in-demand skills and advance your career.
                            </p>
                            <div className="search-container bg-white p-3 rounded-pill shadow">
                                <InputGroup>
                                    <InputGroup.Text className="bg-transparent border-0">
                                        <FaSearch className="text-primary" />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Search courses, topics, or skills..."
                                        className="border-0 shadow-none"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </InputGroup>
                            </div>
                        </Col>
                        <Col lg={5} className="d-none d-lg-block">
                            <img
                                src={learning}
                                alt="Learning Illustration"
                                className="img-fluid"
                                style={{ maxHeight: '350px' }}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Main Content */}
            <Container className="py-5">
                <Row>
                    {/* Sidebar Filters */}
                    <Col lg={3} className="mb-4">
                        <div className="filters-container bg-white p-4 rounded-3xl shadow-custom">
                            <h5 className="mb-4 fw-bold">Filter Courses</h5>

                            <div className="mb-4">
                                <Form.Label className="fw-semibold">Category</Form.Label>
                                <Form.Select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="rounded-pill border-0 bg-light"
                                >
                                    {categories.map(category => (
                                        <option key={category.value} value={category.value}>{category.label}</option>
                                    ))}
                                </Form.Select>
                            </div>

                            <div className="mb-4">
                                <Form.Label className="fw-semibold">Level</Form.Label>
                                <Form.Select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                    className="rounded-pill border-0 bg-light"
                                >
                                    {levels.map(level => (
                                        <option key={level.value} value={level.value}>{level.label}</option>
                                    ))}
                                </Form.Select>
                            </div>

                            <div className="text-center mt-4">
                                <Button
                                    variant="outline-secondary"
                                    className="rounded-pill px-4"
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setSelectedLevel('all');
                                        setSearchTerm('');
                                    }}
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        </div>

                        {/* Featured Statistics */}
                        <div className="bg-white p-4 rounded-3xl shadow-custom mt-4">
                            <h5 className="mb-4 fw-bold">Why Choose Us</h5>
                            <div className="d-flex align-items-center mb-3">
                                <div className="stat-icon rounded-circle bg-primary bg-opacity-10 p-2 me-3">
                                    <FaUsers className="text-primary" />
                                </div>
                                <div>
                                    <h6 className="mb-0 fw-semibold">37,500+ Students</h6>
                                    <small className="text-muted">Trusted by professionals</small>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-3">
                                <div className="stat-icon rounded-circle bg-success bg-opacity-10 p-2 me-3">
                                    <FaStar className="text-success" />
                                </div>
                                <div>
                                    <h6 className="mb-0 fw-semibold">4.7+ Rating</h6>
                                    <small className="text-muted">Highly reviewed content</small>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="stat-icon rounded-circle bg-info bg-opacity-10 p-2 me-3">
                                    <FaLaptopCode className="text-info" />
                                </div>
                                <div>
                                    <h6 className="mb-0 fw-semibold">Industry Experts</h6>
                                    <small className="text-muted">Learn from professionals</small>
                                </div>
                            </div>
                        </div>
                    </Col>

                    {/* Course Listings */}
                    <Col lg={9}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="fw-bold mb-0">All Courses ({filteredCourses.length})</h4>
                            <div className="d-flex align-items-center">
                                <span className="me-2 text-muted">Sort by:</span>
                                <Form.Select
                                    className="rounded-pill border-0 bg-light"
                                    style={{ width: '150px' }}
                                >
                                    <option value="popular">Most Popular</option>
                                    <option value="newest">Newest</option>
                                    <option value="rating-high">Highest Rated</option>
                                    <option value="students">Most Enrolled</option>
                                </Form.Select>
                            </div>
                        </div>

                        {filteredCourses.length === 0 ? (
                            <div className="text-center py-5">
                                <div className="mb-4">
                                    <FaSearch size={50} className="text-muted opacity-50" />
                                </div>
                                <h3>No courses found</h3>
                                <p className="text-muted">Try adjusting your search or filters to find what you're looking for.</p>
                                <Button
                                    variant="primary"
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setSelectedLevel('all');
                                        setSearchTerm('');
                                    }}
                                >
                                    View All Courses
                                </Button>
                            </div>
                        ) : (
                            <Row className="g-4">
                                {filteredCourses.map(course => (
                                    <Col key={course.course_id} lg={12}>
                                        <CourseCard course={course} />
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

const CourseCard = ({ course }) => {
    const [expanded, setExpanded] = useState(false);

    // Calculate total course hours (assume each week is ~10 hours)
    const totalHours = course.duration_weeks * 10;

    // Calculate total modules
    const totalModules = course.modules.length;

    // Calculate total projects
    const totalProjects = course.modules.reduce(
        (total, module) => total + module.projects.length, 0
    );

    return (
        <Card className="course-card border-0 shadow-custom overflow-hidden h-100">
            <div className="p-4">
                <div className="d-flex flex-column flex-md-row">
                    {/* Course Image */}
                    <div className="course-image me-md-4 mb-3 mb-md-0" style={{ minWidth: '200px', maxWidth: '200px' }}>
                        <img
                            src={course.image}
                            alt={course.course_name}
                            className="rounded-3xl img-fluid shadow-sm"
                            style={{ aspectRatio: '3/2', objectFit: 'cover' }}
                        />
                    </div>

                    {/* Course Info */}
                    <div className="course-info flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <Badge bg={
                                    course.category === 'data_science' ? 'primary' :
                                        course.category === 'full_stack' ? 'success' : 'info'
                                } className="px-3 py-2 rounded-pill mb-2">
                                    {course.category === 'data_science' ? 'Data Science & AI' :
                                        course.category === 'full_stack' ? 'Full Stack Development' : 'Cloud & DevOps'}
                                </Badge>
                                <h4 className="fw-bold mb-2">{course.course_name}</h4>
                                <p className="text-muted mb-2">{course.provider}</p>
                            </div>
                            <div className="text-end">
                                {/* <div className="course-price mb-2">
                  <span className="fs-4 fw-bold text-primary">Free Access</span>
                </div> */}
                                <div className="course-rating mb-2">
                                    <span className="me-1">
                                        <FaStar className="text-warning" />
                                    </span>
                                    <span className="fw-semibold">{course.rating}</span>
                                    <span className="text-muted"> ({course.students_enrolled.toLocaleString()} students)</span>
                                </div>
                            </div>
                        </div>

                        <p className="course-description mb-3">
                            {course.description}
                        </p>

                        <div className="course-meta d-flex flex-wrap gap-3 mb-3">
                            <div className="d-flex align-items-center">
                                <div className="me-2 text-primary">
                                    <FaClock />
                                </div>
                                <span>{course.duration_weeks} weeks ({totalHours} hours)</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="me-2 text-success">
                                    <FaLaptopCode />
                                </div>
                                <span>{totalModules} Modules</span>
                            </div>
                            <div className="d-flex align-items-center">
                                <div className="me-2 text-info">
                                    <FaTools />
                                </div>
                                <span>{totalProjects} Projects</span>
                            </div>
                            <div>
                                <Badge bg="light" text="dark" className="fw-normal border">
                                    {course.level}
                                </Badge>
                            </div>
                        </div>

                        <div className="d-flex flex-wrap gap-2 mb-4">
                            {course.tools_covered.slice(0, 6).map((tool, index) => (
                                <Badge key={index} bg="secondary" className="bg-opacity-10 text-secondary px-2 py-1">
                                    {tool}
                                </Badge>
                            ))}
                            {course.tools_covered.length > 6 && (
                                <Badge bg="secondary" className="bg-opacity-10 text-secondary px-2 py-1">
                                    +{course.tools_covered.length - 6} more
                                </Badge>
                            )}
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <Button
                                variant="outline-primary"
                                className="rounded-pill px-3 d-flex align-items-center gap-2"
                                onClick={() => setExpanded(!expanded)}
                            >
                                {expanded ? 'Hide Details' : 'View Curriculum'}
                                <FaChevronRight className={expanded ? 'rotate-90' : ''} />
                            </Button>

                            <div>
                                <Link to={`/courses/${course.course_id}`}>
                                    <Button variant="outline-secondary" className="me-2 rounded-pill">Learn More</Button>
                                </Link>
                                <Link to={`/assessment`}>
                                    <Button variant="primary" className="rounded-pill">Enroll Now</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Expandable Curriculum Section */}
            {expanded && (
                <div className="course-curriculum px-4 pb-4">
                    <hr className="my-3" />
                    <h5 className="fw-bold mb-3">Course Curriculum</h5>

                    <div className="module-progress mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="fw-semibold">Course Progress</span>
                            <span className="text-primary fw-semibold">
                                {totalModules} modules • {course.duration_weeks} weeks
                            </span>
                        </div>
                        <div className="d-flex gap-1 mb-2">
                            {course.modules.map((module, index) => (
                                <div
                                    key={index}
                                    className="flex-grow-1"
                                    style={{ height: '8px' }}
                                >
                                    <ProgressBar
                                        now={100}
                                        className="h-100 rounded-pill"
                                        variant={
                                            index % 3 === 0 ? 'primary' :
                                                index % 3 === 1 ? 'success' : 'info'
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Accordion>
                        {course.modules.map((module, index) => (
                            <Accordion.Item
                                key={module.module_id}
                                eventKey={module.module_id}
                                className="border-0 mb-3 shadow-sm rounded-3"
                            >
                                <Accordion.Header className="p-0">
                                    <div className="py-2 ps-3 pe-5 w-100">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <Badge
                                                    bg={
                                                        index % 3 === 0 ? 'primary' :
                                                            index % 3 === 1 ? 'success' : 'info'
                                                    }
                                                    className="opacity-75 me-2"
                                                >
                                                    Module {index + 1}
                                                </Badge>
                                                <span className="fw-bold">{module.title}</span>
                                            </div>
                                            <div className="text-muted d-none d-md-block">
                                                {module.duration_weeks} weeks
                                            </div>
                                        </div>
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body className="p-3 bg-light rounded-bottom">
                                    <p>{module.description}</p>

                                    <div className="mt-3">
                                        <h6 className="fw-semibold mb-2">Topics Covered:</h6>
                                        <ul className="list-unstyled">
                                            {module.topics.map((topic, i) => (
                                                <li key={i} className="mb-2 d-flex align-items-start">
                                                    <FaChevronRight className="text-primary mt-1 me-2" size={12} />
                                                    <span>{topic}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="mt-3">
                                        <h6 className="fw-semibold mb-2">Projects:</h6>
                                        <div className="d-flex flex-wrap gap-2">
                                            {module.projects.map((project, i) => (
                                                <Badge
                                                    key={i}
                                                    bg="white"
                                                    className="border border-primary text-primary px-3 py-2 rounded-pill"
                                                >
                                                    {project}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </div>
            )}
        </Card>
    );
};

export default CoursesPage;
