import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, ProgressBar, Alert, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import CourseCard from '../components/CourseCard';
import AssessmentService from '../services/AssessmentService';
import courses from '../data/courses';

const AssessmentPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const courseId = queryParams.get('courseId');

  // States for the assessment
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [error, setError] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState('');
  const [showTrackSelection, setShowTrackSelection] = useState(true);
  
  // Auto-select track based on courseId if provided
  useEffect(() => {
    if (courseId) {
      const course = courses.find(c => c.course_id === courseId);
      if (course) {
        const track = course.category; // Assuming category corresponds to track id
        setSelectedTrack(track);
        setUserAnswers({ track_selection: track });
        setShowTrackSelection(false);
        fetchQuestions(track);
      }
    }
  }, [courseId]);

  // Available tracks
  const tracks = [
    {
      id: 'data_science',
      name: 'Data Science',
      description: 'Learn data analysis, machine learning, and AI to extract insights from data.',
      icon: '📊'
    },
    {
      id: 'full_stack',
      name: 'Full Stack Development',
      description: 'Build web applications with front-end and back-end technologies.',
      icon: '💻'
    },
    {
      id: 'cloud_devops',
      name: 'Cloud & DevOps',
      description: 'Master cloud infrastructure, CI/CD pipelines, and DevOps practices.',
      icon: '☁️'
    }
  ];

  // Fetch questions based on selected track
  const fetchQuestions = async (track) => {
    setLoading(true);
    try {
      // In a real application, this would be an API call
      setTimeout(() => {
        // Get random questions for the selected track
        const selectedQuestions = AssessmentService.getRandomQuestions(track, 20);
        
        if (selectedQuestions.length === 0) {
          throw new Error(`No questions available for the ${track} track.`);
        }
        
        setQuestions(selectedQuestions);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError(`Failed to load assessment questions: ${err.message}`);
      setLoading(false);
    }
  };

  // Handle track selection
  const handleTrackSelect = (track) => {
    setSelectedTrack(track);
    setUserAnswers(prevAnswers => ({ 
      ...prevAnswers,
      track_selection: track 
    })); // Store the track selection
    setShowTrackSelection(false);
    fetchQuestions(track);
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer
    });
  };

  // Handle navigation between questions
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Complete the assessment and get course recommendations
  const completeAssessment = () => {
    // In a real application, you would send the answers to your backend
    // and get personalized course recommendations
    
    // For demo purposes, we'll simulate a delay and then show recommendations
    setLoading(true);
    
    setTimeout(() => {
      // Use our recommendation service to get personalized recommendations
      // Pass both user answers and the full set of questions
      import('../services/RecommendationService').then(module => {
        const RecommendationService = module.default;
        const recommendations = RecommendationService.getRecommendations(userAnswers, questions);
        setRecommendedCourses(recommendations);
        setAssessmentComplete(true);
        setLoading(false);
      });
    }, 1500);
  };

  // Calculate progress percentage
  const progress = questions.length > 0
    ? ((Object.keys(userAnswers).length - 1) / questions.length * 100).toFixed(0)
    : 0;

  // Show loading state
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <h2>Loading...</h2>
        <ProgressBar animated now={100} className="mt-3" />
      </Container>
    );
  }

  // Show error message if there was an issue loading questions
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Container>
    );
  }

  // Show track selection screen
  if (showTrackSelection) {
    return (
      <Container className="py-5">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold mb-3">Personalized Skill Assessment</h1>
          <div className="mx-auto" style={{ maxWidth: '700px' }}>
            {selectedTrack ? (
              <Alert variant="info" className="mb-4 rounded-pill shadow-sm">
                <div className="d-flex align-items-center justify-content-center">
                  <div className="me-3">
                    <span style={{ fontSize: '1.5rem' }}>
                      {selectedTrack === 'data_science' ? '📊' : 
                       selectedTrack === 'full_stack' ? '💻' : '☁️'}
                    </span>
                  </div>
                  <div>
                    Previously selected: <strong>{selectedTrack === 'data_science' ? 'Data Science' : 
                                               selectedTrack === 'full_stack' ? 'Full Stack Development' : 
                                               'Cloud & DevOps'}</strong>. 
                    You may select another track if you prefer.
                  </div>
                </div>
              </Alert>
            ) : (
              <p className="lead mb-4">
                Choose your learning path below to begin your customized assessment.
                We'll tailor questions specifically for your selected area of interest.
              </p>
            )}
            <div className="path-decoration d-flex justify-content-center mb-5">
              <div className="path-line bg-primary" style={{ height: '4px', width: '50px' }}></div>
              <div className="path-line bg-success mx-3" style={{ height: '4px', width: '50px' }}></div>
              <div className="path-line bg-info" style={{ height: '4px', width: '50px' }}></div>
            </div>
          </div>
        </div>

        <Row className="justify-content-center">
          {tracks.map((track) => (
            <Col key={track.id} md={4} className="mb-4">
              <Card 
                className="h-100 track-card border-0 shadow-custom overflow-hidden"
                onClick={() => handleTrackSelect(track.id)}
                style={{ 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div className={`track-banner bg-${
                  track.id === 'data_science' ? 'primary' : 
                  track.id === 'full_stack' ? 'success' : 'info'
                } py-3`}></div>
                <Card.Body className="text-center p-2">
                  <div 
                    className={`track-icon-wrapper rounded-circle d-flex align-items-center justify-content-center mx-auto mb-4 bg-${
                      track.id === 'data_science' ? 'primary' : 
                      track.id === 'full_stack' ? 'success' : 'info'
                    } bg-opacity-10`}
                    style={{ width: '80px', height: '80px' }}
                  >
                    <span className="display-5">{track.icon}</span>
                  </div>
                  <Card.Title className="fw-bold mb-3">{track.name}</Card.Title>
                  <Card.Text className="text-muted">{track.description}</Card.Text>
                </Card.Body>
                <Card.Footer className="bg-white border-top-0 text-center p-3">
                  <Button 
                    variant={
                      track.id === 'data_science' ? 'primary' : 
                      track.id === 'full_stack' ? 'success' : 'info'
                    } 
                    className="rounded-pill px-4 py-2 fw-semibold"
                  >
                    Select This Track
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
        
        <div className="text-center mt-5 pt-3">
          <p className="text-muted">
            <small>
              All assessments are tailored to your experience level and help us 
              recommend the most relevant courses for your learning journey
            </small>
          </p>
          <div className="d-flex justify-content-center align-items-center gap-4 mt-4">
            <div className="d-flex align-items-center">
              <div className="me-2 rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center" 
                   style={{ width: '24px', height: '24px', minWidth: '24px' }}>
                <span className="text-primary" style={{ fontSize: '0.8rem' }}>✓</span>
              </div>
              <span className="small text-muted">20+ Questions</span>
            </div>
            <div className="d-flex align-items-center">
              <div className="me-2 rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center" 
                   style={{ width: '24px', height: '24px', minWidth: '24px' }}>
                <span className="text-success" style={{ fontSize: '0.8rem' }}>✓</span>
              </div>
              <span className="small text-muted">Personalized Results</span>
            </div>
            <div className="d-flex align-items-center">
              <div className="me-2 rounded-circle bg-info bg-opacity-10 d-flex align-items-center justify-content-center" 
                   style={{ width: '24px', height: '24px', minWidth: '24px' }}>
                <span className="text-info" style={{ fontSize: '0.8rem' }}>✓</span>
              </div>
              <span className="small text-muted">Targeted Module Matches</span>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  // Show assessment results/recommendations
  if (assessmentComplete) {
    return (
      <Container className="py-5">
        <h1 className="mb-4">Your Assessment Results</h1>
        <Alert variant="success">
          <Alert.Heading>Assessment Complete!</Alert.Heading>
          <p>
            Based on your responses, we've identified courses that align with your
            current skills and learning goals.
          </p>
        </Alert>

        <h2 className="mt-5 mb-4">Recommended Courses</h2>
        <Row>
          {recommendedCourses.map((course, index) => (
            <Col key={index} md={6} lg={4} className="mb-4">
              <CourseCard course={course} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }

  // Current question for the assessment
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const canNavigateNext = userAnswers[currentQuestion?.questionID] !== undefined;

  // Show the assessment questions
  return (
    <Container className="py-5">
      <h1 className="mb-4">Skill Assessment</h1>
      <p className="lead mb-4">
        Answer the following questions to help us understand your current skills and
        learning goals. We'll use your responses to recommend the best courses for you.
      </p>

      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span>Progress: {progress}%</span>
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
        </div>
        <ProgressBar now={progress} />
      </div>

      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          onAnswerSelect={handleAnswerSelect}
          selectedAnswer={userAnswers[currentQuestion.questionID]}
        />
      )}

      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="outline-secondary"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!canNavigateNext}
        >
          {isLastQuestion ? 'Complete Assessment' : 'Next Question'}
        </Button>
      </div>
    </Container>
  );
};

export default AssessmentPage;
