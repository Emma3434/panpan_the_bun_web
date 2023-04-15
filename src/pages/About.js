import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";

import { Container, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { ListGroup, Card } from 'react-bootstrap';

import { Row, Col} from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas, far);

function About() {
  const [aboutData, setAboutData] = useState([]);

  useEffect(() => {
    fetch('https://panpan-server.herokuapp.com/about')
      .then(response => response.json())
      .then(data => setAboutData(data))
      .catch(error => console.error(error));
  }, []);

  if (aboutData.length === 0) {
    return <p>Loading...</p>;
  }

  const renderIcon = (iconName) => {
    if (!iconName) {
      return null;
    }
    
    const [prefix, iconNameWithoutPrefix] = iconName.split(" ");
    return <FontAwesomeIcon icon={[prefix, iconNameWithoutPrefix]} style={{ marginRight: "0.5rem" }}/>;
  };
  

  return (
    <div>
      <NavBar/>
      <h2>About</h2>
      <ListGroup>
        <ListGroup.Item>
          <Card>
            <Card.Body>
              {aboutData.map((aboutItem, index) => (
                <div key={index}>
                  <ListGroup>
                  <ListGroup.Item>
                    <h5 class="text-success" >
                      {renderIcon(aboutItem.icon)}
                      {aboutItem.item}
                    </h5>
                    <p>{aboutItem.content}</p>
                  </ListGroup.Item>
                </ListGroup>
                </div>
              ))}
            </Card.Body>
          </Card>
        </ListGroup.Item>
      </ListGroup>
      
    </div>
  );
}

export default About;
