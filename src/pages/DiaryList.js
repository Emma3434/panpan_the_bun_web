import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";

import { Container, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { ListGroup, Card } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faAngleDoubleLeft, faAngleDoubleRight, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

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

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const calendar = [];
  
    // Add weekday names row
    const weekdayNames = weekdays.map((weekday) => (
      <Col key={weekday}>
        <div className="text-center">{weekday}</div>
      </Col>
    ));
    calendar.push(<Row key="weekdays">{weekdayNames}</Row>);
  
    let day = 1;
    for (let week = 0; week < 6; week++) {
      const cells = [];
      for (let i = 0; i < 7; i++) {
        if ((week === 0 && i < firstDayOfMonth) || day > daysInMonth) {
          cells.push(<Col key={`${week}-${i}`}></Col>);
        } else {
          const diary = diaries.find((d) => {
            const diaryDate = new Date(d.date);
            return (
              diaryDate.getUTCDate() === day &&
              diaryDate.getUTCMonth() === month &&
              diaryDate.getUTCFullYear() === year
            );
          });
          const button = diary ? (
            <Button variant="primary" href={`/diaries/${diary._id}`}>
              {day}
            </Button>
          ) : (
            <Button variant="secondary" disabled>
              {day}
            </Button>
          );
          cells.push(
            <Col key={`${week}-${i}`}>
              <Row>{button}</Row>
            </Col>
          );
          day++;
        }
      }
      calendar.push(<Row key={week}>{cells}</Row>);
    }
  
    return <Container>{calendar}</Container>;
  };
  


  // for month display
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = new Date(year, month);
  const monthName = months[date.getMonth()];

  return (
    <div>
      <NavBar />
      <h2 className="text-center" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <span style={{ marginRight: "1rem" }}>
          <FontAwesomeIcon icon={faCalendarAlt} />
        </span>
        Diary
      </h2>
      <Container fluid className="left-home-right mt-3" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
        <Row className="m-0 justify-content-center">
          <Col xs={1} className="d-flex justify-content-start align-items-center p-0">
            <Button variant="primary" role="button" onClick={handlePreviousYear}>
              <FontAwesomeIcon icon={faAngleDoubleLeft} className="mr-1" />
            </Button>
          </Col>
          <Col xs={1} className="d-flex justify-content-start align-items-center p-0">
            <Button variant="primary" role="button" onClick={handlePreviousMonth}>
              <FontAwesomeIcon icon={faChevronLeft} className="mr-1" />
            </Button>
          </Col>
          <Col xs={6} className="text-center d-flex justify-content-center align-items-center p-0">
            <span>{year} {monthName}</span>
          </Col>
          <Col xs={1} className="d-flex justify-content-end align-items-center p-0">
            <Button variant="primary" role="button" onClick={handleNextMonth}>
              <FontAwesomeIcon icon={faChevronRight} className="mr-1" />
            </Button>
          </Col>
          <Col xs={1} className="d-flex justify-content-end align-items-center p-0">
            <Button variant="primary" role="button" onClick={handleNextYear}>
              <FontAwesomeIcon icon={faAngleDoubleRight} className="mr-1" />
            </Button>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <table className="w-100">
              <tbody>{renderCalendar()}</tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </div>
  );

}

export default DiaryList;
