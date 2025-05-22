import React, { useState } from 'react';
import axios from 'axios';

function UploadForm() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData);
      alert(res.data.message);
    } catch (err) {
      alert('Upload failed: ' + err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadForm;
