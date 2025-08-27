import { Table, Button, InputGroup, FormControl } from 'react-bootstrap'; // importing button from bootstrap
import { useDispatch, useSelector } from 'react-redux'; // importing useDispatch, useSelector from redux
import { setSelectedEmp, removeEmpFromList, deleteEmpFromServer, getEmpFromServer } from '../slices/empSlices';
import { useEffect, useState } from 'react'; // importing useState, useEffect from react
import { Col, Container, Row } from 'react-bootstrap'; // importing column, container, row from bootstrap
import Form from 'react-bootstrap/Form'; // importing Form from bootstrap

function EmpList(props) {
    const { empList } = useSelector((state) => state.employees); // used to display the new changes in UI
    const dispatch = useDispatch(); // used to update the global state

    const setIsEditMode = props.setIsEditMode; 

    // delete detail in the table
    const deleteEmp = (emp) => {
        console.log('Delete Employee');
        dispatch(deleteEmpFromServer(emp))
            .unwrap() // helps to directly access the result of thunk
            .then(() => {
                dispatch(removeEmpFromList(emp)); // updates the local state
            });
    };

    const updateEmp = (emp) => {
        console.log('Update Employee');
        setIsEditMode(true); // enables the edit mode
        dispatch(setSelectedEmp(emp)); // update the selected employee
    };

    // print all details in the table
    useEffect(() => {
        dispatch(getEmpFromServer()); // gets the data from server
    }, [dispatch]); // used to ensure effect runs only when dispatch changes

    // Auto update details
    useEffect(() => {
        const autoUpdate = setInterval(() => {
            dispatch(getEmpFromServer()); // calls the data for every 4.2 seconds
        }, 4200);
        return () => clearInterval(autoUpdate); // stops repeating the code
    }, [dispatch]);

    const [fill, setFill] = useState(''); // used for filter

    return (
        <>
            <Container>
                <Row className='justify-content-md-end'> {/* used for grid system */}
                    <Col lg='4'>
                        <Form>
                            <InputGroup className='d-flex justify-content-end'>
                                <FormControl placeholder='Filter by Name' name='filter' onChange={(e) => { setFill(e.target.value) }} />
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Table>
                <thead className='w-50'>
                    <tr>
                        <th>ID</th>
                        <th>Profile</th>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Email</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        empList.filter((emp) => {
                            return fill.toLowerCase() === '' ? emp : emp.name.toLowerCase().includes(fill.toLowerCase());
                        }).map((emp, index) => {
                            return (
                                <tr key={emp._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img src={`https://thanfees.pineappleai.cloud${emp.image}`} alt="Profile" className='rounded-circle' style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                    </td>
                                    <td>{emp.name}</td>
                                    <td>{emp.position}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.email}</td>
                                    <td>
                                        <Button variant="primary" className='mx-2' onClick={() => updateEmp(emp)}>
                                            Edit <i className="bi bi-pencil-square" />
                                        </Button>
                                        <Button variant="danger" onClick={() => deleteEmp(emp)}>
                                            Delete <i className='bi bi-trash' />
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </>
    );
}

export default EmpList;
