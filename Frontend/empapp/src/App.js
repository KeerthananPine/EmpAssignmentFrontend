import React, { useState } from 'react'; //impoting useState from react
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; //importing Routes, Route, Navigate, useLocation from react roter dom
import { useSelector } from 'react-redux'; //importing useSelector from redux
import { Col, Container, Row } from 'react-bootstrap'; // importing Col, Container, Row from bootstrap
import AddEmp from './components/AddEmp';
import EmpList from './components/EmpList';
import Login from './authentication/Login';
import RegisterForm from './authentication/RegisterForm';
import NavBar from './components/NavBar';


function App() {
  const [isEditMode, setIsEditMode] = useState(false);
  const token = useSelector((state) => state.auth.token); //helps to access the token from auth store using state
  const location = useLocation(); //helps to know what route are we in
  
  return (
    <Container>
      <Routes>
        <Route path="/login" element={
          <Row className='justify-content-md-center'>
            <Col lg='6'>
              <Login />
            </Col>
          </Row>
        } />

        <Route path="/register" element={
          <Row className='justify-content-md-center'>
            <Col lg='6'>
              <RegisterForm />
            </Col>
          </Row>
        } />
        
   
        <Route path="/employees" element={ //if successfully log in we go to next page
          token ? (
            <>
            <NavBar/>
              <Row className='justify-content-md-center'>
                <Col lg='6'>
                  <AddEmp isEditMode={isEditMode} setIsEditMode={setIsEditMode} />
                </Col>
              </Row>
              <Row className='justify-content-md-center'>
                <Col>
                  <EmpList setIsEditMode={setIsEditMode} />
                </Col>
              </Row>
            </>
          ) : (
            <Navigate to="/login" replace state={{ from: location }} /> //if log in fails it stays in the login page
          )
        } />
        
       
        <Route path="*" element={
          <Navigate to={"/login"} />
        } />
      </Routes>
    </Container>
  );
}

export default App;