import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";

import { FaUserCircle } from "react-icons/fa";
import { Alert, Dropdown } from "react-bootstrap";
import { Container, Title } from "./navbarStyles";

export const Navbar = (props) => {
  const [error, setError] = useState("");
  const { logout, currentUser } = useAuth();
  const history = useHistory();
  
  const { displayName, email } = currentUser;

  const handleLogOut = async () => {
    setError("");
    try {
      await logout();
      history.push("/signin");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Title>
        <a href='/'>Malaria Detect</a>
      </Title>
      {error && <Alert variant="warning">{error}</Alert>}
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="danger" style={{backgroundColor:'#f06b6b', border: 'none'}}>
            <FaUserCircle style={{ fontSize: "2em" }} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {/* display name of user if found, else show email */}
            <Dropdown.Header>{displayName ?? email}</Dropdown.Header>
            <Dropdown.Item onClick={handleLogOut}>Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Container>
  );
}
