import React, { useState } from 'react';  //importing useState from react
import axios from 'axios'; // importing axios for HTTP request
import Form from 'react-bootstrap/Form';   //importing Form from boostrap
import Button from 'react-bootstrap/Button';   //importing button from boostrap
import {Container} from 'react-bootstrap';// importing container from bootstrap
import { Link, useNavigate } from 'react-router-dom';//importing useNavigate, Link from react router dom

function RegisterForm() {

    
    const navigate = useNavigate();//used for change pages

    const [uName, setUserName] = useState('');//this for store the username 
    const [email, setEmail] = useState('');//this for store the email 
    const [password, setPassword] = useState('');//this for store the password 
    

    const handleSubmit = async e => {
        e.preventDefault();//prevent the form from submission
        try {
            await axios.post('https://thanfees.pineappleai.cloud/api/auth/register', { uName, email, password }); //sending the uNmae, email and password to backend register api
            alert('User Registered Successfully!!!');
            navigate('/login');//after account created redirect the page to login page
            setUserName(''); //update uName
            setEmail(''); //update email
            setPassword(''); //update password
        } catch {
            alert('Enter Valid Details in the Field')
        }
    }

return(
    <>
    <h1 className='text-center text-primary display-5'>CREATE NEW ACCOUNT</h1>

    <Container className='border p-3 border-2 rounded-3'>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="userName">
                <Form.Label className='fw-bold'>User Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Name" value={uName} onChange={(e) => setUserName(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userEmail">
                <Form.Label className='fw-bold'>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter the Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="userPassword">
                <Form.Label className='fw-bold'>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter the Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <div className='text-center'>
            <Button variant="info" type="submit"> Register </Button>
            </div>
        </Form>
        
        <Link to="/login" className="btn btn-link">I Already have an account</Link>
       
    </Container>
    </>
    )
}

export default RegisterForm