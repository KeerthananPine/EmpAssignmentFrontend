import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../slices/authSlices';


function NavBar() {

const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = () => {
  dispatch(logout());
  navigate('/login');
};

  return (
    <div className="d-flex justify-content-end mx-2">
        <Button variant='danger' onClick={handleLogout}>Log out</Button>
    </div>

  )
}

export default NavBar