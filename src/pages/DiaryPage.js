import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function DiaryPage({ match }) {
  const [diary, setDiary] = useState(null);
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    fetch(`https://panpan-server.herokuapp.com/diaries/${match.params.id}`)
      .then(response => response.json())
      .then(data => setDiary(data))
      .catch(error => console.log('error', error));

    fetch("https://panpan-server.herokuapp.com/diaries")
      .then(response => response.json())
      .then(data => setDiaries(data))
      .catch(error => console.log('error', error));
  }, [match.params.id]);

  const currentIndex = diaries.findIndex(d => d._id === diary?._id);

  const handleNavigation = (index) => {
    const nextDiary = diaries[index];
    window.location.href = `/diaries/${nextDiary._id}`;
  };

  const renderContent = (content) => {
    if (content.type === 'paragraph') {
      return <p>{content.value}</p>;
    } else if (content.type === 'image') {
      return (
        <div>
          <img src={content.value} alt={content.caption} />
          <p>{content.caption}</p>
        </div>
      );
    }
  };

  if (!diary) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={() => handleNavigation(currentIndex - 1)}>Previous</button>
      <button onClick={() => window.location.href = "/diaries"}>Calendar</button>
      <button onClick={() => handleNavigation(currentIndex + 1)}>Next</button>
      <h1>{diary.title}</h1>
      <p>{diary.date}</p>
      <p>{diary.weather}</p>
      {diary.content.map((content, index) => (
        <div key={index}>
          {renderContent(content)}
        </div>
      ))}
    </div>
  );
}

export default DiaryPage;
