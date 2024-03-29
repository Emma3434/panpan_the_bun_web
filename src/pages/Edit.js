import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

import { useHistory } from 'react-router-dom';

// rich text editor
import { Editor, EditorState, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

// toolbar
import { Container, ButtonToolbar, ButtonGroup, Button, Dropdown } from 'react-bootstrap';
import { ListGroup, Card } from 'react-bootstrap';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun, faCloudShowersHeavy, faSnowflake, faBolt, faSmog } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

function CreateDiary() {

  // Add components
  const [title, setTitle] = useState('');
  const [content, setContent] = useState([]);
  const [date, setDate] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(faSun);

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setDate(formattedDate);
  }, []);

  const weatherIcons = [
    faSun,
    faCloud,
    faCloudSun,
    faCloudShowersHeavy,
    faSnowflake,
    faBolt,
    faSmog,
  ];  


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleIconChange = (icon) => {
    setSelectedIcon(icon);
  };  

  const handleContentChange = (e, index, captionSide) => {
    const newContent = [...content];
    if (captionSide) {
      newContent[index] = { ...newContent[index], [captionSide]: e.target.value };
    } else {
      newContent[index] = { ...newContent[index], value: e.target.value };
    }
    setContent(newContent);
  };
  
  

  const handleAddParagraph = () => {
    setContent([...content, { type: 'paragraph', value: '' }]);
  };
  
  const handleAddSingleImage = () => {
    setContent([...content, { type: 'single-image', value: '', caption: '' }]);
  };
  
  const handleAddDoubleImage = () => {
    setContent([...content, { type: 'double-image', leftCaption: '', rightCaption: '' }]);
  };
  


  


  const history = useHistory();

  const removeFileExtension = (fileName) => {
    return fileName.split('.').slice(0, -1).join('.');
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
  // Map the content to the required format
  const mappedContent = await Promise.all(
    content.map(async (item, index) => {
      if (typeof item === 'string') {
        return { type: 'text', value: item };
      } else if (item.type === 'single-image') {
        const imgInput = document.getElementById(`single-image-${index}`);
        const imgFile = imgInput.files[0];
        const imgFileName = imgFile.name;
        const imgFileWithoutExtension = removeFileExtension(imgFileName);

        // Save the image to your image database
        const formData = new FormData();
        formData.append('img_id', imgFileWithoutExtension);
        formData.append('img', imgFile);

        const imgUploadResponse = await fetch('https://panpan-server.herokuapp.com/image', {
          method: 'POST',
          body: formData,
        });

        if (!imgUploadResponse.ok) {
          throw new Error('Error uploading image');
        }

        return {
          type: 'single-image',
          value: imgFileWithoutExtension,
          caption: item.caption,
        };
      } else if (item.type === 'double-image') {
        const leftImgInput = document.getElementById(`double-image-left-${index}`);
        const leftImgFile = leftImgInput.files[0];
        const leftImgFileName = leftImgFile.name;
        const leftImgFileWithoutExtension = removeFileExtension(leftImgFileName);

        const rightImgInput = document.getElementById(`double-image-right-${index}`);
        const rightImgFile = rightImgInput.files[0];
        const rightImgFileName = rightImgFile.name;
        const rightImgFileWithoutExtension = removeFileExtension(rightImgFileName);

        // Save the left image to your image database
        const leftFormData = new FormData();
        leftFormData.append('img_id', leftImgFileWithoutExtension);
        leftFormData.append('img', leftImgFile);

        const leftImgUploadResponse = await fetch('https://panpan-server.herokuapp.com/image', {
          method: 'POST',
          body: leftFormData,
        });

        if (!leftImgUploadResponse.ok) {
          throw new Error('Error uploading left image');
        }

        // Save the right image to your image database
        const rightFormData = new FormData();
        rightFormData.append('img_id', rightImgFileWithoutExtension);
        rightFormData.append('img', rightImgFile);

        const rightImgUploadResponse = await fetch('https://panpan-server.herokuapp.com/image', {
          method: 'POST',
          body: rightFormData,
        });

        if (!rightImgUploadResponse.ok) {
          throw new Error('Error uploading right image');
        }

        return {
          type: 'double-image',
          value: [
            {
              value: leftImgFileWithoutExtension,
              caption: item.leftCaption,
            },
            {
              value: rightImgFileWithoutExtension,
              caption: item.rightCaption,
            },
          ],
        };
      } else {
        return item;
      }
    })
  );


  
    // Create an object with the required format
    const diary = {
      title: title,
      date: date,
      weather: selectedIcon.iconName,
      content: mappedContent,
    };
  
    try {
      // Post the diary to the server
      const response = await fetch('https://panpan-server.herokuapp.com/diaries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(diary), // stringify the diary object
      });
  
      const result = await response.json();
      console.log('Diary created:', result);
  
      // Redirect to the main page or any other page  
      history.push('/edit');
    } catch (error) {
      console.error('Error creating diary:', error);
    }
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
            <Button variant="primary" onClick={handleSubmit}>Save</Button>
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
            <form>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem',
                marginTop: '1rem',
              }}
            >
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleTitleChange}
                style={{ flex: 1, marginRight: '1rem' }}
                placeholder="Add a Title"
              />

              <Dropdown style={{ marginLeft: '1rem' }}>
                <Dropdown.Toggle variant="secondary" id="iconDropdown">
                  <FontAwesomeIcon icon={selectedIcon} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {weatherIcons.map((icon, index) => (
                    <Dropdown.Item key={index} onClick={() => handleIconChange(icon)}>
                      <FontAwesomeIcon icon={icon} />
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>


              
              <input type="date" id="date" name="date" value={date} onChange={handleDateChange} style={{width: '100%', marginBottom: '1rem', marginTop: '1rem'}}/>

              {content.map((item, index) => {
                if (item.type === 'paragraph') {
                  return (
                    <div key={index} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Paragraph</strong></p>
                      <textarea value={item.value} onChange={(e) => handleContentChange(e, index)} style={{ width: '100%' }} placeholder="Enter paragraph text..." />
                    </div>
                  );
                } else if (item.type === 'single-image') {
                  return (
                    <div key={index} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Single Image</strong></p>
                      <input type="file" id={`single-image-${index}`} name={`single-image-${index}`} style={{ width: '100%' }} />
                      <img style={{ width: '100%', marginBottom: '0.5rem' }} />
                      <textarea value={item.caption} onChange={(e) => handleContentChange(e, index, 'caption')} style={{ width: '100%' }} placeholder="Enter image caption..." />
                    </div>
                  );
                } else if (item.type === 'double-image') {
                  return (
                    <div key={index} style={{ marginBottom: '1rem', marginTop: '1rem' }}>
                      <p style={{ marginBottom: '0.5rem' }}><strong>Double Images</strong></p>
                      <div className="row">
                        <div className="col">
                          <input
                            className="diary-single-image-input"
                            type="file"
                            id={`double-image-left-${index}`}
                            style={{ width: '100%', marginBottom: '0.5rem' }}
                          />
                          <img style={{ width: '100%', marginBottom: '0.5rem' }} />
                          <textarea className="diary-single-image-caption-input" value={item.leftCaption} onChange={(e) => handleContentChange(e, index, 'leftCaption')} placeholder="Enter image caption..." style={{ width: '100%' }} />
                          </div>
                            <div className="col">
                              <input
                                className="diary-single-image-input"
                                type="file"
                                id={`double-image-right-${index}`}
                                style={{ width: '100%', marginBottom: '0.5rem' }}
                              />
                          <img style={{ width: '100%', marginBottom: '0.5rem' }} />
                          <textarea className="diary-single-image-caption-input" value={item.rightCaption} onChange={(e) => handleContentChange(e, index, 'rightCaption')} placeholder="Enter image caption..." style={{ width: '100%' }} />
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

export default CreateDiary;

