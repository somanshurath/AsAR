import React from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';

const CourseCard = ({ course }) => {
  // Generate a random progress percentage for the demo
  const randomProgress = Math.floor(Math.random() * 30);
  
  // Get the course type based on course_id
  const getCourseType = (courseId) => {
    if (courseId.includes('ds')) return 'Data Science';
    if (courseId.includes('fs')) return 'Full Stack';
    if (courseId.includes('devops')) return 'Cloud & DevOps';
    return 'Professional';
  };
  
  return (
    <Card className="h-100 shadow-sm course-card border-0">
      <div className="position-relative">
        <div 
          className="card-img-top bg-light d-flex align-items-center justify-content-center" 
          style={{ height: '140px', backgroundColor: '#f8f9fa' }}
        >
          <div className="text-center p-4">
            <span className="display-4">
              {getCourseType(course.course_id).split(' ')[0][0]}
            </span>
          </div>
        </div>
        <Badge 
          bg="primary" 
          className="position-absolute top-0 end-0 m-2 px-2 py-1"
        >
          {getCourseType(course.course_id)}
        </Badge>
      </div>
      
      <Card.Body>
        <Card.Title className="fw-bold">{course.course_name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted small">By {course.provider}</Card.Subtitle>
        
        <Card.Text className="text-secondary small mt-3">
          {course.description.length > 120 ? 
            `${course.description.substring(0, 120)}...` : 
            course.description}
        </Card.Text>
        
        <Row className="my-3">
          <Col xs={6}>
            <div className="d-flex flex-column">
              <span className="text-muted small">Duration</span>
              <span className="fw-bold">{course.duration_weeks} weeks</span>
            </div>
          </Col>
          <Col xs={6}>
            <div className="d-flex flex-column">
              <span className="text-muted small">Completion</span>
              <div className="progress" style={{ height: '6px' }}>
                <div 
                  className="progress-bar" 
                  role="progressbar" 
                  style={{ width: `${randomProgress}%` }}
                  aria-valuenow={randomProgress} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
              <span className="small">{randomProgress}%</span>
            </div>
          </Col>
        </Row>
        
        <div className="mb-3">
          <span className="text-muted small d-block mb-2">Skills you'll learn:</span>
          <div className="mt-1">
            {course.tools_covered.slice(0, 4).map((tool, index) => (
              <Badge bg="light" text="dark" className="me-1 mb-1 small shadow-sm" key={index}>
                {tool}
              </Badge>
            ))}
            {course.tools_covered.length > 4 && (
              <Badge bg="light" text="dark" className="me-1 mb-1 small">
                +{course.tools_covered.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </Card.Body>
      <Card.Footer className="bg-white border-top-0 pb-3">
        <Button variant="outline-primary" className="w-100 rounded-pill">View Course</Button>
      </Card.Footer>
    </Card>
  );
};

export default CourseCard;
