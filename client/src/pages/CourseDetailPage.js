import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Tabs, Tab, ListGroup, ProgressBar, Alert } from 'react-bootstrap';
import {
    FaStar, FaUsers, FaClock, FaLaptopCode, FaTools, FaCertificate,
    FaCheck, FaUserGraduate, FaChalkboardTeacher, FaCalendarAlt, FaArrowLeft,
    FaArrowRight
} from 'react-icons/fa';
import courses from '../data/courses';

const CourseDetailPage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Find the course with the matching ID
        const foundCourse = courses.find(c => c.course_id === courseId);

        if (foundCourse) {
            setCourse(foundCourse);
        }

        setLoading(false);
    }, [courseId]);

    if (loading) {
        return (
            <Container className="py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </Container>
        );
    }

    if (!course) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    <h4>Course Not Found</h4>
                    <p>The course you're looking for doesn't exist or has been removed.</p>
                    <Link to="/courses">
                        <Button variant="primary">Back to All Courses</Button>
                    </Link>
                </Alert>
            </Container>
        );
    }

    // Calculate totals
    const totalHours = course.duration_weeks * 10;
    const totalModules = course.modules.length;
    const totalTopics = course.modules.reduce(
        (total, module) => total + module.topics.length, 0
    );
    const totalProjects = course.modules.reduce(
        (total, module) => total + module.projects.length, 0
    );

    return (
        <div className="course-detail-page">
            {/* Course Header */}
            <div className="gradient-bg py-5 mb-5">
                <Container>
                    <Link to="/courses" className="btn btn-light btn-sm rounded-pill mb-3">
                        <FaArrowLeft className="me-2" /> Back to Courses
                    </Link>

                    <Row className="align-items-center">
                        <Col lg={7} className="text-white mb-4 mb-lg-0">
                            <div className="mb-3">
                                <Badge bg="light" text="dark" className="fw-semibold px-3 py-2 rounded-pill me-2">
                                    {course.category === 'data_science' ? 'Data Science & AI' :
                                        course.category === 'full_stack' ? 'Full Stack Development' : 'Cloud & DevOps'}
                                </Badge>
                                <Badge bg="light" text="dark" className="fw-semibold px-3 py-2 rounded-pill">
                                    {course.level}
                                </Badge>
                            </div>

                            <h1 className="display-5 fw-bold mb-3">{course.course_name}</h1>
                            <p className="lead mb-4">{course.description}</p>

                            <div className="d-flex flex-wrap gap-4 mb-4">
                                <div className="d-flex align-items-center">
                                    <div className="me-2 rounded-circle bg-info bg-white d-flex align-items-center justify-content-center"
                                        style={{ width: '24px', height: '24px', minWidth: '24px' }}>
                                        <FaStar className="text-warning" />
                                    </div>
                                    <div>
                                        <div className="fw-semibold">{course.rating} Rating</div>
                                        <small className="text-white-50">{course.students_enrolled.toLocaleString()} students</small>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <div className="me-2 rounded-circle bg-info bg-white d-flex align-items-center justify-content-center"
                                        style={{ width: '24px', height: '24px', minWidth: '24px' }}>
                                        <FaClock className="text-primary" />
                                    </div>
                                    <div>
                                        <div className="fw-semibold">{course.duration_weeks} Weeks</div>
                                        <small className="text-white-50">{totalHours} total hours</small>
                                    </div>
                                </div>

                                <div className="d-flex align-items-center">
                                    <div className="me-2 rounded-circle bg-info bg-white d-flex align-items-center justify-content-center"
                                        style={{ width: '24px', height: '24px', minWidth: '24px' }}>
                                        <FaLaptopCode className="text-success" />
                                    </div>
                                    <div>
                                        <div className="fw-semibold">{totalModules} Modules</div>
                                        <small className="text-white-50">{totalProjects} projects</small>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <p className="mb-1 fw-semibold">Provided by:</p>
                                <h5 className="fw-bold">{course.provider}</h5>
                            </div>
                        </Col>

                        <Col lg={5}>
                            <Card className="border-0 rounded-3xl shadow-lg">
                                <Card.Body className="p-4">
                                    {/* <div className="text-center mb-4">
                    <h2 className="fw-bold text-primary mb-1">Free Access</h2>
                    <p className="mb-0 text-muted">Full course access</p>
                  </div> */}

                                    <div className="d-grid gap-2 mb-4">
                                        <Link to={`/assessment?courseId=${courseId}`}>
                                            <Button variant="primary" size="lg" className="rounded-pill py-3 fw-semibold w-100">
                                                Enroll Now
                                            </Button>
                                        </Link>
                                        <Button variant="outline-secondary" className="rounded-pill py-3">
                                            Try for Free
                                        </Button>
                                    </div>

                                    <div className="course-includes">
                                        <h6 className="fw-bold mb-3">This Course Includes:</h6>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="border-0 px-0 d-flex align-items-center">
                                                <FaClock className="text-primary me-2" />
                                                <span>{totalHours} hours of on-demand video</span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="border-0 px-0 d-flex align-items-center">
                                                <FaTools className="text-primary me-2" />
                                                <span>{totalTopics} lessons with hands-on exercises</span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="border-0 px-0 d-flex align-items-center">
                                                <FaLaptopCode className="text-primary me-2" />
                                                <span>{totalProjects} real-world projects</span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="border-0 px-0 d-flex align-items-center">
                                                <FaCertificate className="text-primary me-2" />
                                                <span>Certificate of completion</span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="border-0 px-0 d-flex align-items-center">
                                                <FaUsers className="text-primary me-2" />
                                                <span>24/7 community support</span>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Course Content */}
            <Container className="py-5">
                <Row>
                    <Col lg={8}>
                        <Tabs defaultActiveKey="curriculum" className="mb-4 course-tabs">
                            <Tab eventKey="curriculum" title="Curriculum">
                                <div className="bg-white rounded-3xl shadow-custom p-4">
                                    <h3 className="fw-bold mb-4">Course Curriculum</h3>

                                    <div className="module-progress mb-4">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="fw-semibold">Course Progress Overview</span>
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

                                    {course.modules.map((module, index) => (
                                        <Card key={module.module_id} className="border-0 shadow-sm rounded-3xl mb-4">
                                            <Card.Header className="bg-white border-0 pt-3 pb-0 px-4">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <Badge
                                                            bg={
                                                                index % 3 === 0 ? 'primary' :
                                                                    index % 3 === 1 ? 'success' : 'info'
                                                            }
                                                            className="opacity-75 mb-2"
                                                        >
                                                            Module {index + 1}
                                                        </Badge>
                                                        <h4 className="fw-bold mb-0">{module.title}</h4>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="fw-semibold">{module.duration_weeks} weeks</div>
                                                        <small className="text-muted">{module.duration_weeks * 10} hours</small>
                                                    </div>
                                                </div>
                                            </Card.Header>

                                            <Card.Body className="px-4 pb-4">
                                                <p className="mb-4">{module.description}</p>

                                                <div className="mb-4">
                                                    <h6 className="fw-bold mb-3">Topics You'll Learn:</h6>
                                                    <Row xs={1} md={2}>
                                                        {module.topics.map((topic, i) => (
                                                            <Col key={i} className="mb-2">
                                                                <div className="d-flex align-items-start">
                                                                    <FaCheck className="text-success mt-1 me-2" />
                                                                    <span>{topic}</span>
                                                                </div>
                                                            </Col>
                                                        ))}
                                                    </Row>
                                                </div>

                                                <div>
                                                    <h6 className="fw-bold mb-3">Projects You'll Build:</h6>
                                                    <div className="d-flex flex-wrap gap-2">
                                                        {module.projects.map((project, i) => (
                                                            <Badge
                                                                key={i}
                                                                bg="light"
                                                                text="dark"
                                                                className="fw-semibold px-3 py-2 border"
                                                            >
                                                                {project}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            </Tab>

                            <Tab eventKey="overview" title="Overview">
                                <div className="bg-white rounded-3xl shadow-custom p-4">
                                    <h3 className="fw-bold mb-4">Course Overview</h3>

                                    <div className="mb-5">
                                        <h5 className="fw-bold mb-3">What You'll Learn</h5>
                                        <Row xs={1} md={2} className="g-4">
                                            {course.modules.flatMap(module => module.topics)
                                                .slice(0, 10)
                                                .map((topic, index) => (
                                                    <Col key={index}>
                                                        <div className="d-flex align-items-start">
                                                            <FaCheck className="text-success mt-1 me-2" />
                                                            <span>{topic}</span>
                                                        </div>
                                                    </Col>
                                                ))
                                            }
                                        </Row>
                                    </div>

                                    <div className="mb-5">
                                        <h5 className="fw-bold mb-3">Requirements</h5>
                                        <p>{course.eligibility}</p>
                                    </div>

                                    <div className="mb-5">
                                        <h5 className="fw-bold mb-3">Tools & Technologies</h5>
                                        <div className="d-flex flex-wrap gap-2">
                                            {course.tools_covered.map((tool, index) => (
                                                <Badge
                                                    key={index}
                                                    bg="light"
                                                    className="px-3 py-2 rounded-pill border"
                                                >
                                                    {tool}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <h5 className="fw-bold mb-3">Who This Course is For</h5>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item className="border-0 px-0 d-flex align-items-start">
                                                <FaUserGraduate className="text-primary mt-1 me-2" />
                                                <span>Students looking to build a career in {
                                                    course.category === 'data_science' ? 'Data Science and AI' :
                                                        course.category === 'full_stack' ? 'Web Development' : 'Cloud & DevOps'
                                                }</span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="border-0 px-0 d-flex align-items-start">
                                                <FaChalkboardTeacher className="text-primary mt-1 me-2" />
                                                <span>Professionals wanting to upskill or transition into a new technical role</span>
                                            </ListGroup.Item>
                                            <ListGroup.Item className="border-0 px-0 d-flex align-items-start">
                                                <FaCalendarAlt className="text-primary mt-1 me-2" />
                                                <span>Anyone committed to {course.duration_weeks} weeks of focused learning</span>
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </div>
                                </div>
                            </Tab>

                            <Tab eventKey="reviews" title="Reviews">
                                <div className="bg-white rounded-3xl shadow-custom p-4">
                                    <h3 className="fw-bold mb-4">Student Reviews</h3>

                                    <div className="reviews-summary d-flex flex-column flex-md-row align-items-center mb-4">
                                        <div className="rating-overall text-center me-md-5 mb-4 mb-md-0">
                                            <div className="display-3 fw-bold text-primary">{course.rating}</div>
                                            <div className="stars mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar
                                                        key={i}
                                                        className={i < Math.floor(course.rating) ? "text-warning" : "text-muted"}
                                                        size={20}
                                                    />
                                                ))}
                                            </div>
                                            <div className="text-muted">Course Rating</div>
                                        </div>

                                        <div className="rating-breakdown flex-grow-1">
                                            {[5, 4, 3, 2, 1].map(stars => {
                                                // Calculate a percentage based on the overall rating
                                                let percentage = 0;
                                                if (stars === 5) percentage = 70;
                                                else if (stars === 4) percentage = 20;
                                                else if (stars === 3) percentage = 7;
                                                else if (stars === 2) percentage = 2;
                                                else percentage = 1;

                                                return (
                                                    <div key={stars} className="d-flex align-items-center mb-2">
                                                        <div className="stars-label me-2" style={{ width: '60px' }}>
                                                            <div className="d-flex align-items-center">
                                                                <span className="me-1">{stars}</span>
                                                                <FaStar className="text-warning" size={12} />
                                                            </div>
                                                        </div>
                                                        <div className="progress flex-grow-1" style={{ height: '8px' }}>
                                                            <div
                                                                className="progress-bar bg-warning"
                                                                style={{ width: `${percentage}%` }}
                                                            ></div>
                                                        </div>
                                                        <div className="percentage-label ms-2" style={{ width: '40px' }}>
                                                            {percentage}%
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <Alert variant="info" className="text-center">
                                        <h6 className="fw-bold mb-0">More reviews coming soon!</h6>
                                        <p className="mb-0">We're gathering feedback from our students.</p>
                                    </Alert>
                                </div>
                            </Tab>
                        </Tabs>
                    </Col>

                    <Col lg={4}>
                        <div className="sticky-top" style={{ top: '100px' }}>
                            <Card className="border-0 rounded-3xl shadow-custom mb-4">
                                <Card.Body className="p-4">
                                    <h5 className="fw-bold mb-3">Related Courses</h5>

                                    {courses.filter(c => c.course_id !== course.course_id)
                                        .filter(c => c.category === course.category)
                                        .slice(0, 2)
                                        .map(relatedCourse => (
                                            <Card key={relatedCourse.course_id} className="border-0 shadow-sm mb-3">
                                                <Card.Body className="p-3">
                                                    <div className="d-flex">
                                                        <div className="flex-shrink-0 me-3">
                                                            <img
                                                                src={relatedCourse.image}
                                                                alt={relatedCourse.course_name}
                                                                className="rounded"
                                                                width="60"
                                                                height="60"
                                                                style={{ objectFit: 'cover' }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h6 className="fw-semibold mb-1" style={{ fontSize: '0.95rem' }}>
                                                                {relatedCourse.course_name}
                                                            </h6>
                                                            <div className="d-flex align-items-center mb-2">
                                                                <FaStar className="text-warning me-1" size={12} />
                                                                <small className="text-muted">
                                                                    {relatedCourse.rating} • {relatedCourse.duration_weeks} weeks
                                                                </small>
                                                            </div>
                                                            <Link to={`/courses/${relatedCourse.course_id}`}>
                                                                <Button variant="link" size="sm" className="p-0">
                                                                    View Course
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        ))
                                    }

                                    <div className="text-center mt-3">
                                        <Link to="/courses" className="text-decoration-none">
                                            View All Courses <FaArrowRight className="ms-1" />
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>

                            <Card className="border-0 rounded-3xl shadow-custom bg-primary text-white">
                                <Card.Body className="p-4">
                                    <h5 className="fw-bold mb-3">Need Help Deciding?</h5>
                                    <p>Not sure if this course is right for you? Take our free skill assessment to get personalized course recommendations.</p>
                                    <Link to="/assessment">
                                        <Button variant="light" className="text-primary fw-semibold w-100">
                                            Take Skill Assessment
                                        </Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default CourseDetailPage;
