import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');
    const navigate = useNavigate();
  
    const handleRegister = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/register', {
          firstName,
          lastName,
          username,
          password,
          role
        });
        console.log(response.data);
        localStorage.setItem('token', response.data.token); //tokeni kaydet
        alert('Registration successful');
        navigate('/');
      } catch (error) {
        console.log('Registration failed', error);
        alert('Registration failed');
      }
    };
  
    return (
      <Container className="mt-5">
          <Form onSubmit={handleRegister} className="w-50 mx-auto">
              <h2 className="text-center mb-4">Register</h2>
              <Form.Group controlId="formBasicFirstName">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                  />
              </Form.Group>
              <Form.Group controlId="formBasicLastName">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                  />
              </Form.Group>
              <Form.Group controlId="formBasicUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                  />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                  />
              </Form.Group>
              <Form.Group controlId="formBasicRole">
                  <Form.Label>Role:</Form.Label>
                  <Form.Control
                      as="select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                  >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                  </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mt-3">
                  Register
              </Button>
          </Form>
      </Container>
  );
  }

export default RegisterForm;
