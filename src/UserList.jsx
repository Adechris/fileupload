// UserList.js
import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap"
const UserList = ({ users }) => {

  return (
    <Container className='mt-5'>
      <div className="text-center">
      <h2>Registered Users</h2>
      </div>
      <Row>
       {users.map((user, index) => (
        <Col key={index} sm={3} md={3} className="mt-3 mb-2">
          <Card>
          <img 
          src={`http://localhost:3800/uploads/${user.image_path}`}  height={300} alt="User" style={{objectFit:"cover"}}/>
          <div className='text-center mt-1'>
          <p>{user.first_name} {user.last_name}</p>
          </div>
          </Card>
        </Col>
      ))}
      </Row>
    </Container>
  );
};

export default UserList;

