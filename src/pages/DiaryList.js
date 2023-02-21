import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function DiaryList() {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    fetch("https://panpan-server.herokuapp.com/diaries")
      .then(response => response.json())
      .then(data => setDiaries(data))
      .then(data => console.log(data))
      .catch(error => console.log('error', error));
  }, []);

  return (
    <div>
      <h1>My Diaries List</h1>
      <ul id="diaries-list">
        {diaries.map(diary => (
            <li key={diary._id}>
                <Link to={`/diaries/${diary._id}`}>
                    <h2>{diary.title}</h2>
                </Link>
                <p>{diary.date}</p>
                <p>{diary.weather}</p>
            </li>
            ))}
      </ul>
    </div>
  );
}


export default DiaryList;