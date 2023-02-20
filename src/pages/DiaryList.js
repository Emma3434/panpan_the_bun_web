import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function DiaryList() {
  const [diaries, setDiaries] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  useEffect(() => {
    fetch("https://panpan-server.herokuapp.com/diaries")
      .then(response => response.json())
      .then(data => setDiaries(data))
      .catch(error => console.log('error', error));
  }, []);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const handlePreviousMonth = () => {
    setMonth(month => month === 0 ? 11 : month - 1);
    setYear(year => month === 0 ? year - 1 : year);
  };

  const handleNextMonth = () => {
    setMonth(month => month === 11 ? 0 : month + 1);
    setYear(year => month === 11 ? year + 1 : year);
  };

  const handlePreviousYear = () => {
    setYear(year => year - 1);
  };

  const handleNextYear = () => {
    setYear(year => year + 1);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const calendar = [];

    let day = 1;
    for (let week = 0; week < 6; week++) {
      const cells = [];
      for (let i = 0; i < 7; i++) {
        if ((week === 0 && i < firstDayOfMonth) || day > daysInMonth) {
          cells.push(<td key={`${week}-${i}`}></td>);
        } else {
          const diary = diaries.find(d => new Date(d.date).getDate() === day && new Date(d.date).getMonth() === month && new Date(d.date).getFullYear() === year);
          const button = diary ? (
            <Link to={`/diaries/${diary._id}`}>
              <button>{day}</button>
            </Link>
          ) : (
            <button disabled>{day}</button>
          );
          cells.push(<td key={`${week}-${i}`}>{button}</td>);
          day++;
        }
      }
      calendar.push(<tr key={week}>{cells}</tr>);
    }

    return calendar;
  };

  return (
    <div>
      <h1>My Diaries Calendar</h1>
      <div>
        <button onClick={handlePreviousYear}>Previous Year</button>
        <button onClick={handlePreviousMonth}>Previous Month</button>
        <span>Year: {year} Month: {month + 1}</span>
        <button onClick={handleNextMonth}>Next Month</button>
        <button onClick={handleNextYear}>Next Year</button>
        
      </div>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
     </div>
  );
}

export default DiaryList;