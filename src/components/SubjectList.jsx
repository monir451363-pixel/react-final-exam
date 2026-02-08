import React from 'react';
import { Link } from 'react-router-dom';
import './css/SubjectList.css';

const SubjectList = ({ subjects }) => {
  const subjectColors = {
    fiction: '#4f46e5',
    science: '#10b981',
    history: '#f59e0b',
    biography: '#8b5cf6',
    fantasy: '#ec4899',
    mystery: '#ef4444'
  };

  return (
    <div className="subject-list">
      <h2>📚 Browse by Subjects</h2>
      <div className="subjects-grid">
        {subjects.map((subject) => (
          <Link 
            key={subject} 
            to={`/subjects`}
            state={{ selectedSubject: subject }}
            className="subject-card"
            style={{ '--subject-color': subjectColors[subject] }}
          >
            <div className="subject-icon">
              {subject === 'fiction' && '📖'}
              {subject === 'science' && '🔬'}
              {subject === 'history' && '🏛️'}
              {subject === 'biography' && '👤'}
              {subject === 'fantasy' && '🐉'}
              {subject === 'mystery' && '🔍'}
            </div>
            <h3>{subject.charAt(0).toUpperCase() + subject.slice(1)}</h3>
            <p>Explore books on {subject}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;