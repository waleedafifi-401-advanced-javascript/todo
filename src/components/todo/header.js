import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Login from '../auth/login';

export default () => {
  return (
    <header>
      <Navbar bg="primary" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link>Home</Nav.Link>
        </Nav>
        <Login />
      </Navbar>

    </header>
  )
}