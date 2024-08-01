import React, { useState, useEffect } from 'react';
import api from '../../api';

const MyList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await api.get('/questions');
        setQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h2>My List</h2>
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <a href={question.link} target="_blank" rel="noopener noreferrer">{question.name}</a> - {question.type} ({question.difficulty})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyList;