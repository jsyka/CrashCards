import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const UrlUpload = () => {
    const [imageUrl, setImageUrl]=useState('');
    
    useEffect(() => {
    // Fetch data from the OCR API endpoint
    axios.get(`http://localhost:5001/api/analyze-image?imageUrl=${imageUrl}`)
      .then(response => {
        // Log the response data to the console
        console.log('API Response:', response.data);
      })
      .catch(error => {
        // Log any errors to the console
        console.error('API Error:', error);
      });
  }, []);

    const handleChange = (event) => {
        setImageUrl(event.target.value);
    };

    const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted URL:', imageUrl);

    axios.get(`http://localhost:5001/api/analyze-image?imageUrl=${imageUrl}`)
      .then(response => {
        // Log the response data to the console
        console.log('API Response:', response.data);
      })
      .catch(error => {
        // Log any errors to the console
        console.error('API Error:', error);
      });

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <label htmlFor="urlInput">Enter URL:</label>
      <input
        id="urlInput"
        type="text"
        value={imageUrl}
        onChange={handleChange}
        placeholder="https://example.com"
        required
      />
      <button type="submit">Submit</button>
    </form>
    </div>
  )
}

export default UrlUpload
