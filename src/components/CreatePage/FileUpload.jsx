import React, { useState } from 'react';
import './FileUpload.css'

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(selectedFile.type)) {
        setError('Invalid file type. Please upload an image or PDF.');
        setFile(null);
        setPreview(null);
        return;
      }

      setFile(selectedFile);
      setError(null);

      // Create a preview for images
      if (selectedFile.type.startsWith('image/')) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // Cleanup URL object
        return () => URL.revokeObjectURL(objectUrl);
      } else {
        setPreview(null); // No preview for PDF files
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      console.log('File submitted:', file);

      // You can now upload the file to your server or process it
      // Example: uploadFile(file);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/jpeg, image/png, application/pdf"
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {preview && file?.type.startsWith('image/') && (
        <div>
          <h3>Image Preview:</h3>
          <img src={preview} alt="Preview" style={{ maxWidth: '100%' }} />
        </div>
      )}
      {file && file.type === 'application/pdf' && (
        <div>
          <h3>Uploaded PDF:</h3>
          <p>{file.name}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
