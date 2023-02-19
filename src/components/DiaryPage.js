// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// function DiaryPage() {
//   const { id } = useParams();
//   const [diary, setDiary] = useState(null);

//   useEffect(() => {
//     fetch(`http://localhost:3000/diaries/${id}`)
//       .then(response => response.json())
//       .then(data => setDiary(data))
//       .then(response => console.log(response))
//       .catch(error => console.log('error', error));
//   }, [id]);

//   const renderContent = (content) => {
//     if (content.type === 'paragraph') {
//       return <p>{content.value}</p>
//     } 
    
//     else if (content.type === 'image') {
//       return (
//         <div>
//           {/* <img src={content.value} alt={content.caption} /> */}
//           <p>{content.value}</p>
//           <p>{content.caption}</p>
//         </div>
//       )
//     }
//   }

//   if (!diary) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//         <h1> diary title</h1>
//         <h1>{diary.title}</h1>
//         <p>{diary.date}</p>
//         <p>{diary.weather}</p>
//         {diary.content.map((content, index) => (
//         <div key={index}>
//             {renderContent(content)}
//         </div>
//         ))}
//     </div>
//   );
// }


// export default DiaryPage;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function DiaryPage({ match }) {
  const [diary, setDiary] = useState(null);

  useEffect(() => {
    fetch(`https://panpan-server.herokuapp.com/diaries/${match.params.id}`)
      .then(response => response.json())
      .then(data => setDiary(data))
      .then(response => console.log(response))
      .catch(error => console.log('error', error));
  }, [match.params.id]);

  const handlePrevious = () => {
    // go to the previous diary in the list if there is one
    fetch("https://panpan-server.herokuapp.com/diaries")
      .then(response => response.json())
      .then(data => {
        const index = data.findIndex(d => d._id === diary._id);
        if (index > 0) {
          const previousDiary = data[index - 1];
          window.location.href = `/diaries/${previousDiary._id}`;
        }
      })
      .catch(error => console.log('error', error));
  };

  const handleCalendar = () => {
    // go to the diary list page
    window.location.href = "/";
  };

  const handleNext = () => {
    // go to the next diary in the list if there is one
    fetch("https://panpan-server.herokuapp.com/diaries")
      .then(response => response.json())
      .then(data => {
        const index = data.findIndex(d => d._id === diary._id);
        if (index < data.length - 1) {
          const nextDiary = data[index + 1];
          window.location.href = `/diaries/${nextDiary._id}`;
        }
      })
      .catch(error => console.log('error', error));
  };

    const renderContent = (content) => {
        if (content.type === 'paragraph') {
            return <p>{content.value}</p>
        } 

        else if (content.type === 'image') {
            return (
            <div>
                {/* <img src={content.value} alt={content.caption} /> */}
                <p>{content.value}</p>
                <p>{content.caption}</p>
            </div>
            )
        }
    }

  if (!diary) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleCalendar}>Calendar</button>
      <button onClick={handleNext}>Next</button>
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
