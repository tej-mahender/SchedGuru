import React, { useState } from "react";
import { useLogin } from "../../contexts/LoginContext";
import { Card, Button, Form, Container } from "react-bootstrap";

const Login = () => {
  const { login } = useLogin();
  const [empID, setEmpID] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: "22rem" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Employee ID"
                value={empID}
                onChange={(e) => setEmpID(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" className="w-100" onClick={() => login(empID, password)}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
