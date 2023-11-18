import React from 'react';
import Dashboard from './Dashboard';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { FiArrowRight } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom';
import Img from '../asset/Banner.jpg';

function Home() {
  let navigate = useNavigate()
  return <>
    <div className='header-home'>
      <div>
        <Dashboard />
      </div>
      <div>
      <Card className="home-banner m-2" style={{ border: 'none' }}>
    <div className="background-container">
        <div className="background-overlay">
            <Card.ImgOverlay>
                <div className='text-center mt-5 responsive-title'>SeaView Bistro</div>
                <Card.Text className='text-center ml-5 responsive-text'>
                    Elevating Cuisine, Enchanting Your Senses!
                </Card.Text>
                <div className='d-flex justify-content-center'>
                    <Button variant="warning" onClick={() => navigate('/login')}>Order now{' '}<FiArrowRight /></Button>
                </div>
            </Card.ImgOverlay>
        </div>
    </div>
</Card>


      </div>
      <div className='contact-us' id='contact'>
    <div className='text-white text-center'><h3>Contact Us</h3></div>
    <div className='contact-content'>
        <div className='address'>
            <span className='text-warning'><h4 className=''>Address</h4></span>
            <p className='text-warning'>Head office:<br />
                SeaView Bistro,<br />
                No.17, Anna salai, Puducherry-10.
            </p>
        </div>
        <div className='contact-info'>
            <p className='text-warning'>
                <span className='text-warning'>Mob - </span>8015415456<br />
                <span className='text-warning'>Email - </span>dossarokia45@gmail.com
            </p>
        </div>
    </div>
</div>

    </div>
  </>
}

export default Home;
