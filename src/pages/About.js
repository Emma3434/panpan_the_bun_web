import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";

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

  return (
    <div>
      <NavBar/>
      <h2>About</h2>
      {aboutData.map((aboutItem, index) => (
        <div key={index}>
          {/* <img src={aboutItem.icon} alt={aboutItem.content} /> */}
          <p>{aboutItem.icon}</p>
          <p>{aboutItem.content}</p>
          <p>{aboutItem.item}</p>
        </div>
      ))}
    </div>
  );
}

export default About;
