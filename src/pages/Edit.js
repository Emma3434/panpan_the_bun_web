import React, { useState, useEffect } from 'react';

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/image');
        const data = await response.json();
        setImages(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('img_id', selectedFile.name.split('.')[0]);
    formData.append('img', selectedFile[0]);
    
  
    // Check for duplicated img_id
    const existingImage = images.find((image) => image.img_id === formData.get('img_id'));
    if (existingImage) {
      console.log(`Replacing image with img_id: ${formData.get('img_id')}`);
      try {
        await fetch(`http://localhost:3000/image/${existingImage._id}`, {
          method: 'PUT',
          body: formData,
        });
        setImages((prevImages) =>
          prevImages.map((image) => {
            if (image._id === existingImage._id) {
              return { ...existingImage };
            }
            return image;
          })
        );
      } catch (err) {
        console.error(err);
      }
    } else {
      // Upload new image if img_id doesn't exist
      try {
        const response = await fetch('http://localhost:3000/image', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        setImages((prevImages) => [...prevImages, data]);
      } catch (err) {
        console.error(err);
      }
    }
  };
  

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} multiple/>
        <button type="submit">Upload Image</button>
      </form>

      {/* {images.map((image) => {
        const base64String = btoa(
          new Uint8Array(image.img.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        const imageUrl = `data:${image.img.contentType};base64,${base64String}`;

        return (
          <div key={image._id}>
            <img src={imageUrl} alt="Image" />
          </div>
        );
      })} */}
    </div>
  );
}

export default ImageUploader;
