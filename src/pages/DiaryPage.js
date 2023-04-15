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


import {
  faSun,
  faCloud,
  faCloudSun,
  faCloudShowersHeavy,
  faSnowflake,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";


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

  const getWeatherIcon = (weather) => {
    switch (weather) {
      case "sun":
        return faSun;
      case "cloud":
        return faCloud;
      case "cloud-sun":
        return faCloudSun;
      case "cloud-showers-heavy":
        return faCloudShowersHeavy;
      case "snowflake":
        return faSnowflake;
      case "bolt":
        return faBolt;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric',
      month: 'long',
      day: '2-digit', 
      weekday: 'long',
      timeZone: 'UTC' // set the time zone to UTC
    };
    
    const ordinal = (n) => {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };
    
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    const dateParts = formattedDate.split(", ");
    const [weekday, monthAndDay, year] = dateParts;
    const [month, day] = monthAndDay.split(" ");
  
    return `${month} ${ordinal(parseInt(day))}, ${year} ${weekday}`;
  };  
  
  

  const renderContent = (content) => {
    if (content.type === 'paragraph') {
      return <p dangerouslySetInnerHTML={{ __html: content.value }}></p>;
    } else if (content.type === 'single-image') {
      const base64String = btoa(
        new Uint8Array(content.img.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      const imageUrl = `data:${content.img.contentType};base64,${base64String}`;
  
      return (
        <div style={{ textAlign: 'center' }}>
          <img src={imageUrl} alt={content.caption} style={{ width: '100%', maxWidth: '400px'}}/>
          <p className="text-center" dangerouslySetInnerHTML={{ __html: content.caption }}></p>
        </div>
      );
    } else if (content.type === 'double-image') {
      return (
        
        <Row>
          {content.value.map((imageContent, index) => {
            
            const base64String = btoa(
              new Uint8Array(imageContent.img.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
              )
            );
            const imageUrl = `data:${imageContent.img.contentType};base64,${base64String}`;

            const minHeight = Math.min(...content.value.map((img) => img.img.height));
            return (
              <Col key={index} xs={6} style={{ textAlign: 'center'}}>
                <img src={imageUrl} alt={imageContent.caption} style={{ width: '100%', maxHeight: `${minHeight}px` }}/>
                <p className="text-center" dangerouslySetInnerHTML={{ __html: imageContent.caption }}></p>
              </Col>
            );
          })}
        </Row>
        // <Row>
        //   {content.value.map((imageContent, index) => {

        //     const base64String = btoa(
        //       new Uint8Array(imageContent.img.data).reduce(
        //         (data, byte) => data + String.fromCharCode(byte),
        //         ''
        //       )
        //     );
        //     const imageUrl = `data:${imageContent.img.contentType};base64,${base64String}`;

        //     const minHeight = Math.min(...content.value.map((img) => img.img.height));
        //     return (
        //       <Col key={index} xs={6} style={{ textAlign: 'center'}}>
        //         <div style={{ height: `${minHeight}px`, width: '100%', overflow: 'hidden', position: 'relative' }}>
        //           <img src={imageUrl} alt={imageContent.caption} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', objectFit: 'cover', height: '100%', width: '100%' }}/>
        //         </div>
        //         <p className="text-center" dangerouslySetInnerHTML={{ __html: imageContent.caption }}></p>
        //       </Col>
        //     );
        //   })}
        // </Row>


      );
    }
  };
  
  

  if (!diary) {
    return <div>
      <h1>Loading Panpan's diary...</h1>
      <p>Thank you for waiting woof~</p>
    </div>;
  }

  

  return (
    <div>
      <NavBar/>
      <Container fluid style={{ position: 'sticky', top: '80px', zIndex: 100, backgroundColor: '#000000', maxWidth: "800px" }}>
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
        <ListGroup.Item className="border-0">
          <Card className="mx-auto" style={{ maxWidth: "800px" }}>
            <Card.Body>
            <h1>{diary.title}</h1>
            <h6 className="text-muted card-subtitle mb-2">
              {formatDate(diary.date)}{' '}
              <FontAwesomeIcon icon={getWeatherIcon(diary.weather)} />
              <br />
            </h6>
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
