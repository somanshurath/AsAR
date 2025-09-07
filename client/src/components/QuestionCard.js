import React from 'react';
import { Card, Form } from 'react-bootstrap';

const QuestionCard = ({ question, onAnswerSelect, selectedAnswer }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Body>
        <Card.Title className="mb-3">{question.question}</Card.Title>
        <Form>
          {question.options.map((option, index) => (
            <Form.Check
              key={index}
              type="radio"
              id={`question-${question.questionID}-option-${index}`}
              label={option}
              name={`question-${question.questionID}`}
              checked={selectedAnswer === option}
              onChange={() => onAnswerSelect(question.questionID, option)}
              className="mb-2"
            />
          ))}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default QuestionCard;
