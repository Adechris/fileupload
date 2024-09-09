// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import { Container } from 'react-bootstrap';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3800/users');
      setUsers(response.data);
    } catch (error) {
      alert(error.response.data);
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('image', image);

    try {
      await axios.post('http://localhost:3800/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('file uploaded and data saved successfully')
      // console.log('File uploaded and data saved successfully!');
      setFirstName('');
      setLastName('');
      setImage('');
      setImageUrl('');
      fetchUsers(); // Fetch updated user data
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0])); 
  };

  return (
    <Container>
      <h1 className="my-4 text-center">User Registration</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control shadow-none"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control shadow-none"

          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-control shadow-none"

          />
        </div>
        {imageUrl && (
          <div className="image-preview">
            <img src={imageUrl} alt="Selected" className="img-thumbnail" />
          </div>
        )}
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
      <UserList users={users} />
    </Container>
  );
}

export default App;
