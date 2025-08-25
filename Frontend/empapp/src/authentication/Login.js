import React, { useState } from 'react';  //importing useState from react
import axios from 'axios'; // importing axios for HTTP request
import Form from 'react-bootstrap/Form';   //importing Form from boostrap
import Button from 'react-bootstrap/Button';   //importing button from boostrap
import { useDispatch } from 'react-redux'; //importing useDispatch from redux
import { login } from '../slices/authSlices';
import { Container } from 'react-bootstrap';// importing container from bootstrap
import { useNavigate, Link } from 'react-router-dom'; //importing useNavigate, Link from react router dom

function Login() {

 
    const navigate = useNavigate(); //used for change pages

    const dispatch = useDispatch(); // uesd for update the global state
    const [email, setEmail] = useState(''); //this for store the email 
    const [password, setPassword] = useState('');  //this for store the password 

    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent the form from submission
        try {
            const res = await axios.post('http://localhost:4200/api/auth/login', { email, password }); //sending the email and password to backend login api
            localStorage.setItem('token', res.data.token); //stroing the token in browser local storage
            dispatch(login({user: res.data.user, token: res.data.token })); //after log in it updated the global state
            navigate('/employees'); //after logged in redirect the page to employee route
        } catch {
            alert('Login failed. Check the Email or Password')
        }
}

  return (
<>
    <h1 className='text-center text-primary display-2'>LOG IN</h1>
    <h1 className='text-center lead'>WELCOME BACK</h1>

    <Container className='border p-2 border-2 rounded-3'>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="userEmail">
                <Form.Label className='fw-bold'>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter the Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userPassword">
                <Form.Label className='fw-bold'>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter the Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <div className='text-center'>
            <Button variant="success" type="submit"> Log In </Button>
            </div>
        </Form>

        <Link to="/register" className="btn btn-link">I do not have an Account </Link>
        
    </Container>
</>
  )
}

export default Login