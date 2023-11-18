import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';


function Navigation() {

  const name = sessionStorage.getItem('name')

  const navigate = useNavigate();

//logout function
  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/adminLogin')
  }


//navbar for admin
  return <>
    <div>
    <Navbar collapseOnSelect expand="lg" >
    <Container>
        <Navbar.Brand className='text-black navbar-title me-5' onClick={() => navigate('/adminHome')}>
            SeaView-Bistro-Admin
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='me-auto'>
                <Nav.Link className='text-black' onClick={() => navigate('/adminHome/all-orders')}>All-Orders</Nav.Link>
                <Nav.Link className='text-black' onClick={() => navigate('/adminHome/add-products')}>Add-Product</Nav.Link>
                <Nav.Link className='text-black' onClick={() => navigate('/adminHome/all-products')}>All-Products</Nav.Link>
                <Nav.Link className='text-black' onClick={() => navigate('/adminHome/order-status')}>Order-status</Nav.Link>
            </Nav>
            <Nav>
                <Dropdown>
                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                        <CgProfile /> {name}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleLogout()}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Nav>
        </Navbar.Collapse>
    </Container>
</Navbar>

    </div>

  </>
}

export default Navigation;
