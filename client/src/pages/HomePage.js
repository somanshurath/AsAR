import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeroBanner from '../components/HeroBanner';

const HomePage = () => {
  // Sample statistics for the landing page
  const statistics = [
    { number: '500+', label: 'Courses Available' },
    { number: '50k+', label: 'Learners' },
    { number: '95%', label: 'Completion Rate' },
    { number: '87%', label: 'Career Growth' }
  ];

  // Features list for the landing page
  const features = [
    {
      title: 'Personalized Learning Path',
      description: 'Take our skills assessment to get a personalized learning path tailored to your current abilities and goals.',
      icon: '📊'
    },
    {
      title: 'Industry-Relevant Courses',
      description: 'All our courses are designed with input from industry experts to ensure you learn what employers need.',
      icon: '🏢'
    },
    {
      title: 'Project-Based Learning',
      description: 'Apply your skills through real-world projects that demonstrate your abilities to potential employers.',
      icon: '🛠️'
    },
    {
      title: 'Career Support',
      description: 'Get guidance from career counselors who help you navigate your professional growth journey.',
      icon: '🚀'
    }
  ];

  return (
    <>
      <HeroBanner />
      
      {/* Statistics Section */}
      <Container className="py-5">
        <Row className="justify-content-center text-center">
          {statistics.map((stat, index) => (
            <Col key={index} xs={6} md={3} className="mb-4">
              <div className="p-4 bg-light rounded shadow-sm">
                <h2 className="display-5 fw-bold text-primary">{stat.number}</h2>
                <p className="mb-0 text-muted">{stat.label}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Features Section */}
      <div className="py-7 position-relative">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              <div className="text-center mb-5">
                <h6 className="text-uppercase text-primary fw-bold mb-2">Our Advantages</h6>
                <h2 className="display-5 fw-bold mb-4">Why Choose <span className="text-gradient">GetHired</span>?</h2>
                <div className="mx-auto" style={{ maxWidth: "500px" }}>
                  <p className="lead text-muted">Our platform provides everything you need to accelerate your career and land your dream job.</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} md={6} lg={3}>
                <div className="feature-card hover-gradient h-100 p-4 rounded-3xl bg-white position-relative transition-all" 
                     style={{
                       boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                       transform: "translateY(0)",
                       transition: "all 0.4s ease"
                     }}>
                  <div className="feature-icon rounded-circle mb-4 d-flex align-items-center justify-content-center" 
                       style={{
                         width: "80px", 
                         height: "80px",
                         background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                         fontSize: "2rem"
                       }}>
                    {feature.icon}
                  </div>
                  <h4 className="mb-3">{feature.title}</h4>
                  <p className="text-muted mb-0">{feature.description}</p>
                  <div className="feature-hover-overlay position-absolute rounded-3xl"
                       style={{
                         inset: "0",
                         background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                         opacity: "0",
                         transition: "opacity 0.4s ease",
                         zIndex: "-1"
                       }}></div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
        
        {/* Background decorative elements */}
        <div className="position-absolute top-50 start-0 translate-middle-y d-none d-xl-block" 
             style={{ zIndex: "-1", left: "-5%" }}>
          <div className="rounded-circle bg-primary bg-opacity-10" style={{ width: "300px", height: "300px" }}></div>
        </div>
        <div className="position-absolute bottom-0 end-0 d-none d-xl-block" 
             style={{ zIndex: "-1", right: "-2%", bottom: "10%" }}>
          <div className="rounded-circle bg-secondary bg-opacity-10" style={{ width: "200px", height: "200px" }}></div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="gradient-bg py-5 mt-5 mb-0 position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100" style={{
          background: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(255,255,255,.1)' fill-rule='evenodd'/%3E%3C/svg%3E\")",
          opacity: 0.5,
        }}></div>
        <Container className="text-center">
          <Row className="justify-content-center">
            <Col lg={8}>
              <h2 className="display-4 fw-bold text-white mb-4">Ready to Start Your Learning Journey?</h2>
              <p className="lead text-white mb-5 opacity-90">Take our assessment today and get personalized course recommendations tailored just for you.</p>
              <div className="d-flex justify-content-center gap-3">
                <a href="/assessment" className="btn btn-light btn-lg px-5 py-3">
                  Start Skill Assessment
                </a>
                <a href="/courses" className="btn btn-outline-light btn-lg px-5 py-3">
                  Browse Courses
                </a>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="position-absolute bottom-0 end-0" style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          transform: "translate(30%, 30%)",
        }}></div>
        <div className="position-absolute top-0 start-0" style={{
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          transform: "translate(-30%, -30%)",
        }}></div>
      </div>
    </>
  );
};

export default HomePage;
