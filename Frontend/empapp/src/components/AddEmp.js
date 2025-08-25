import React, { useEffect, useRef, useState } from 'react';  //importing useState, useEffect, useRef from react
import Form from 'react-bootstrap/Form';   //importing Form from boostrap
import Button from 'react-bootstrap/Button';   //importing button from boostrap
import { useDispatch, useSelector } from 'react-redux';   //importing useDispatch, useSelector from redux
import { addEmpToServer, updateEmpInServer } from '../slices/empSlices'

function AddEmp(props) {

    const isEditMode  = props.isEditMode;  // accessing the isEditMode from App.js
    const setIsEditMode = props.setIsEditMode; // accessing the setIsEditMode from App.js
    
    const dispatch = useDispatch();  {/*uesd for update the global state*/}

    const { selectedEmp } = useSelector((state) => state.employees);  {/*used for display the selectedEmp in UI*/}

    const ImgInputRef = useRef(''); {/*this helps image input field to modify it manually*/}

    const [id, setId] = useState(0);   {/*starting value of id is 0 then we can update the id*/}
    const [name, setName] = useState(''); {/*starting variable name and to update that we use setName*/}
    const [position, setPosition] = useState(''); {/*starting variable position and to update that we use setPosition*/}
    const [department, setDepartment] = useState(''); {/*starting variable department and to update that we use setDepartment*/}
    const [email, setEmail] = useState(''); {/*starting variable email and to update that we use setEmail*/}
    const [image, setPicture] = useState(''); {/*starting variable image and to update that we use setPicture*/}

    {/*check if task is selected or not and prefill the selectedEmp details*/}
    {/*whenever the selectedEmp excutes useEffect will run*/} 
    useEffect(() => {
        if (isEditMode && selectedEmp) {
            setId(selectedEmp._id)
            setName(selectedEmp.name)
            setPosition(selectedEmp.position)
            setDepartment(selectedEmp.department)
            setEmail(selectedEmp.email)
            setPicture(selectedEmp.image)
        }
    }, [isEditMode, selectedEmp])

const handleSubmit = (e) => {
  e.preventDefault();  {/*prevent the form from submission */}

  const formData = new FormData(); // this helps to store the data into formData and send it to backend
  formData.append('name', name); // append helps name to stored into the formData
  formData.append('position', position);
  formData.append('department', department);
  formData.append('email', email);
  
  // Only append image if file exists
  if (ImgInputRef.current.files[0]) {
    formData.append('image', ImgInputRef.current.files[0]);
  }

  if (isEditMode) {
    // For updates, send both ID and formData
    dispatch(updateEmpInServer({ id, formData }));
    setIsEditMode(false);   // after update editMode will trun back to add
  } else {
    dispatch(addEmpToServer(formData));
  }

  // Reset form
  setId('');
  setName('');
  setPosition('');
  setDepartment('');
  setEmail('');
  ImgInputRef.current.value = '';
};

    return (
        <>
           
            <h1 className='text-center text-primary'>Employees List</h1>
            <h3 className='text-center lead'>{isEditMode ? 'Edit Employee Details' : 'Add New Employee'}</h3>
            <section className='my-5'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="empName">
                        <Form.Label className='fw-bold'>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="empPosition">
                        <Form.Label className='fw-bold'>Position</Form.Label>
                        <Form.Control type="text" placeholder="Enter the Position" value={position} onChange={(e) => setPosition(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="empDepartment">
                        <Form.Label className='fw-bold'>Department</Form.Label>
                        <Form.Control type="text" placeholder="Enter the Department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="empEmail">
                        <Form.Label className='fw-bold'>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter the Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empProfile">
                        <Form.Label className='fw-bold'>Profile image</Form.Label>
                        <Form.Control type="file" accept="image/*" ref={ImgInputRef} onChange={(e) => { setPicture(e.target.files[0]);}}
                        />
                    </Form.Group>

                    <div className='text-center'>
                        <Button variant="primary" type="submit">
                            {isEditMode ? 'Update Employee' : 'Add New Employee'}
                        </Button>
                        {isEditMode && (
                              <Button variant="warning" type="button" className='mx-2'  onClick={() => {
                                  setIsEditMode(false);
                                  setId('');
                                  setName('');
                                  setPosition('');
                                  setDepartment('');
                                  setEmail('');
                                  setPicture(null);
                                  ImgInputRef.current.value = '';
                                }}>
                                Cancel
                              </Button>
                         )}
                    </div>
                </Form>
            </section>
        </>
    )
}

export default AddEmp
