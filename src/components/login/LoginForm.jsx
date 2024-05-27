import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:8080/login', {
          username,
          password,
        });
        localStorage.setItem('token', response.data.token);
        alert('Login successful');
        navigate('/');
      } catch (error) {
        console.log('Login failed', error);
        alert('Login failed');
      }
    };
  
    return (
      <Container className="mt-5">
          <Form onSubmit={handleLogin} className="w-50 mx-auto">
              <h2 className="text-center mb-4">Login</h2>
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
              <Button variant="primary" type="submit" className="w-100 mt-3">
                  Login
              </Button>
          </Form>
      </Container>
  );
}

export default LoginForm;