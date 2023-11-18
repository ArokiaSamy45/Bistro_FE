import React from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const navigate = useNavigate();

  return <>

    <div>
    <Navbar collapseOnSelect expand="lg">
    <Container>
        <Navbar.Brand className='text-warning navbar-title me-3' onClick={() => navigate('/home')}>
            SeaView Bistro
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='me-auto'>
                {/* You can add navigation links here */}
            </Nav>
            <Nav>
                <Nav.Link className='text-warning me-3 ms-2' href="#contact">Contact</Nav.Link>
                <Button variant='' onClick={() => navigate('/login')} className='ms-2 text-warning'>
                    Login
                </Button>
                <Button variant="" onClick={() => navigate('/signUp')} className='ms-2 text-warning'>
                    Sign up
                </Button>
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>

    </div>

  </>
}

export default Dashboard;
