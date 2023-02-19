// import { faIconName } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// const renderContent = (content) => {
//   if (content.type === 'paragraph') {
//     return <p>{content.value}</p>;
//   } else if (content.type === 'image') {
//     return (
//       <div>
//         <img src={content.value} alt={content.caption} />
//         <p>{content.caption}</p>
//       </div>
//     );
//   } else if (content.type === 'icon') {
//     const icon = content.value.toLowerCase().replace(/\s/g, '-');
//     const faIcon = `fa${icon}`;
//     const faIconObject = faIconName[faIcon];
//     return (
//       <div>
//         <FontAwesomeIcon icon={faIconObject} />
//         <p>{content.caption}</p>
//       </div>
//     );
//   }
// };

function About() {
    const [aboutData, setAboutData] = useState([]);
  
    useEffect(() => {
      fetch('https://panpan-server.herokuapp.com/about')
        .then(response => response.json())
        .then(data => setAboutData(data))
        .catch(error => console.error(error));
    }, []);
  
    return (
      <div>
        <h2>About</h2>
        {aboutData.map((item, index) => (
          <div key={index}>
            {/* <img src={item.icon} alt={item.content} /> */}
            <p>{item.icon}</p>
            <p>{item.content}</p>
            <p>{item.item}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default About;