// import React, { useState, useEffect } from 'react';
// import Navbar from '../components/Navbar';

// function Edit() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const response = await fetch('http://localhost:3000/image');
//         const data = await response.json();
//         setImages(data);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//     fetchData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const formData = new FormData();
//     formData.append('img_id', selectedFile.name.split('.')[0]);
//     formData.append('img', selectedFile[0]);
    
  
//     // Check for duplicated img_id
//     const existingImage = images.find((image) => image.img_id === formData.get('img_id'));
//     if (existingImage) {
//       console.log(`Replacing image with img_id: ${formData.get('img_id')}`);
//       try {
//         await fetch(`http://localhost:3000/image/${existingImage._id}`, {
//           method: 'PUT',
//           body: formData,
//         });
//         setImages((prevImages) =>
//           prevImages.map((image) => {
//             if (image._id === existingImage._id) {
//               return { ...existingImage };
//             }
//             return image;
//           })
//         );
//       } catch (err) {
//         console.error(err);
//       }
//     } else {
//       // Upload new image if img_id doesn't exist
//       try {
//         const response = await fetch('http://localhost:3000/image', {
//           method: 'POST',
//           body: formData,
//         });
//         const data = await response.json();
//         console.log(data);
//         setImages((prevImages) => [...prevImages, data]);
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };
  

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   return (
//     <div>
//       <Navbar />
//       <form onSubmit={handleSubmit}>
//         <input type="file" onChange={handleFileChange} multiple/>
//         <button type="submit">Upload Image</button>
//       </form>


//     </div>
//   );
// }

// export default Edit;


// {images.map((image) => {
//   const base64String = btoa(
//     new Uint8Array(image.img.data).reduce(
//       (data, byte) => data + String.fromCharCode(byte),
//       ''
//     )
//   );
//   const imageUrl = `data:${image.img.contentType};base64,${base64String}`;

//   return (
//     <div key={image._id}>
//       <img src={imageUrl} alt="Image" />
//     </div>
//   );
// })}












import React, { useState } from 'react';
import Navbar from '../components/Navbar';

// rich text editor
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

// toolbar
import { Container, ButtonToolbar, ButtonGroup, Button } from 'react-bootstrap';
import { ListGroup, Card } from 'react-bootstrap';

function CreateBlog() {

  // Add components
  const [title, setTitle] = useState('');
  const [content, setContent] = useState([]);
  const [date, setDate] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e, index) => {
    const newContent = [...content];
    newContent[index] = e.target.value;
    setContent(newContent);
  };

  const handleAddParagraph = () => {
    setContent([...content, 'paragraph']);
  };

  const handleAddSingleImage = () => {
    setContent([...content, 'single-image']);
  };

  const handleAddDoubleImage = () => {
    setContent([...content, 'double-image']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      content,
      date
    });
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div>
      <Navbar />


      <Container className="mt-3">
        <ButtonToolbar>
          <ButtonGroup className="mr-2">
            <Button variant="primary" type="submit">Save</Button>
            <Button variant="warning">Cancel</Button>
          </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar className="mt-2">
          <ButtonGroup className="mr-2">
            <Button variant="primary" onClick={handleAddParagraph}>+ Paragraph</Button>
            <Button variant="primary" onClick={handleAddSingleImage}>+ Single Image</Button>
            <Button variant="primary" onClick={handleAddDoubleImage}>+ Double Image</Button>
          </ButtonGroup>
        </ButtonToolbar>
      </Container>

      
          
      

      <ListGroup>
        <ListGroup.Item>
          <Card>
            <Card.Body>
            <form onSubmit={handleSubmit}>

              <input type="text" id="title" name="title" value={title} onChange={handleTitleChange} style={{width: '100%', marginBottom: '1rem', marginTop: '1rem'}} placeholder="Add a Title" />

              <input type="date" id="date" name="date" value={date} onChange={handleDateChange} style={{width: '100%', marginBottom: '1rem', marginTop: '1rem'}}/>

              {content.map((item, index) => {
                if (item === 'paragraph') {
                  return (
                    <div key={index} style={{marginBottom: '1rem', marginTop: '1rem'}}>
                      <p style= {{marginBottom: '0.5rem'}}><strong>Paragraph</strong></p> 
                      <textarea value="" onChange={(e) => handleContentChange(e, index)} style={{width: '100%'}} placeholder="Enter paragraph text..." />
                    </div>
                  );
                } else if (item === 'single-image') {
                  return (
                    <div key={index} style={{marginBottom: '1rem', marginTop: '1rem'}}>
                      <p style= {{marginBottom: '0.5rem'}}><strong>Single Image</strong></p> 
                      <input type="file" id={`single-image-${index}`} name={`single-image-${index}`} style={{width: '100%'}}/>
                      <img style={{ width: '100%', marginBottom: '0.5rem' }} />
                      <textarea value="" onChange={(e) => handleContentChange(e, index)} style={{width: '100%'}} placeholder="Enter image caption..." />
                    </div>
                  );
                } else if (item === 'double-image') {
                  return (
                    <div key={index} style={{marginBottom: '1rem', marginTop: '1rem'}}>
                      <p style= {{marginBottom: '0.5rem'}}><strong>Double Images</strong></p> 
                      <div className="row">
                        <div className="col">
                          <input className="diary-single-image-input" type="file" style={{ width: '100%', marginBottom: '0.5rem' }} />
                          <img style={{ width: '100%', marginBottom: '0.5rem' }} />
                          <textarea className="diary-single-image-caption-input" placeholder="Caption" style={{ width: '100%' }}></textarea>
                        </div>
                        <div className="col">
                          <input className="diary-single-image-input" type="file" style={{ width: '100%', marginBottom: '0.5rem' }} />
                          <img style={{ width: '100%', marginBottom: '0.5rem' }} />
                          <textarea className="diary-single-image-caption-input" placeholder="Caption" style={{ width: '100%' }}></textarea>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })}


              </form>
            </Card.Body>
          </Card>
        </ListGroup.Item>
      </ListGroup>
      
    </div>
  );
}

export default CreateBlog;

