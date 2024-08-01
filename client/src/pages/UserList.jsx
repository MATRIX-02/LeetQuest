import React, { useState, useEffect } from 'react';
import api from '../../api';

const UserList = () => {
  const [userQuestions, setUserQuestions] = useState([]);

  useEffect(() => {
    const fetchUserQuestions = async () => {
      try {
        const response = await api.get('/user-questions');
        setUserQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserQuestions();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {userQuestions.map((question) => (
          <li key={question._id}>
            <a href={question.link} target="_blank" rel="noopener noreferrer">{question.name}</a> - {question.type} ({question.difficulty})
            <input type="checkbox" checked={question.solved} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
