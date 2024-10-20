import React from 'react';
import { useParams } from 'react-router-dom';
import { questions } from './questions';

const Question = () => {
  const { id } = useParams();
  const question = questions.find(q => q.id === parseInt(id));

  if (!question) {
    return <div>Question not found</div>;
  }

  return (
    <div>
      <h1>{question.question}</h1>
      {/* Render test cases or any other relevant info */}
      {question.testCases.map((testCase, index) => (
        <div key={index}>
          <p>Input: {JSON.stringify(testCase.input)}</p>
          <p>Expected: {JSON.stringify(testCase.expected)}</p>
        </div>
      ))}
    </div>
  );
};

export default Question;
