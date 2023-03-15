import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Container, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { ListGroup, Card } from 'react-bootstrap';

import { Row, Col} from 'react-bootstrap';

import NavBar from "../components/Navbar";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faHome } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

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
      // return <p>{content.value}</p>
      return <p dangerouslySetInnerHTML={{ __html: content.value }}></p>;
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
      <NavBar/>
      <Container fluid className="left-home-right mt-3">
        <Row className="m-0 justify-content-end">
          <Col xs={4} className="p-0">
            <Button variant="primary" onClick={() => handleNavigation(currentIndex - 1)} aria-label="Previous">
              <FontAwesomeIcon icon={faCaretLeft} className="mr-1" /> LAST
            </Button>
          </Col>
          <Col xs={4} className="p-0 text-center">
            <Button variant="primary" onClick={() => window.location.href = "/diaries"} aria-label="Home">
              <FontAwesomeIcon icon={faHome} />
            </Button>
          </Col>
          <Col xs={4} className="p-0 d-flex justify-content-end">
            <Button variant="primary" onClick={() => handleNavigation(currentIndex + 1)} aria-label="Next">
              NEXT <FontAwesomeIcon icon={faCaretRight} className="ml-1" />
            </Button>
          </Col>
        </Row>
      </Container>



      <ListGroup>
        <ListGroup.Item>
          <Card>
            <Card.Body>
            <h1>{diary.title}</h1>
            <p>{diary.date}</p>
            <p>{diary.weather}</p>
            {diary.content.map((content, index) => (
              <div key={index}>
                {renderContent(content)}
              </div>
            ))}
            </Card.Body>
          </Card>
        </ListGroup.Item>
      </ListGroup>
      
    </div>
  );
}

export default DiaryPage;
