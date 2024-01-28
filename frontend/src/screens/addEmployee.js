import React, { useState, useEffect } from 'react';
import {Form, Container, Card, Row, Col, Button, Alert} from 'react-bootstrap';
import { addEmployee, getEmployeeDataById, updateEmployee } from '../utils/APIUtil';
import { useNavigate, useParams } from "react-router-dom";
import ToastComponent from '../components/toastComponet';


function AddEmployee() {
    const [employeeForm,setEmployeeForm] = useState({
        firstName:"",
        lastName:"",
        mobile:"",
        age:"",
        gender:"",
        department:"",
        designation:"",
        maritalStatus:"",
        dateOfBirth:"",
        address:""
    }); 
    const [validated, setValidated] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [disableInput, setDisableInput] = useState(false);
    const [defaultInputDisable,setDefaultInputDisable] = useState(false);
    const [formError, setFormError] = useState([]);

    const navigate = useNavigate();
    let { employeeId } = useParams();

    useEffect(() => {
        if(employeeId){
            loadEditData();
        }
    },[]);

    const loadEditData=()=>{
        try {
            getEmployeeDataById(employeeId).then(response=>{
                if(response.gender === "MALE"){
                    setDisableInput(true);
                } else {
                    setDefaultInputDisable(true);
                }
                setEmployeeForm({...response});
            }).catch(err => {
                setShowToast(true);
                setAlertMessage(err);
            });
        } catch (error) {
            setShowToast(true);
            setAlertMessage(error);
        }
    }

    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEmployeeForm({ ...employeeForm, [name] : value});
    }

    const handleSubmitForm=(event)=>{
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            if(employeeId) {
                const formData = {...employeeForm,"employeeId":employeeId}
                handleUpdateEmployee(formData);
            } else {
                handleAddEmployee(employeeForm);
            }
        }
        setValidated(true);
    }

    const handleAddEmployee=(employeeForm)=>{
        try {
            addEmployee(employeeForm).then(response=>{
                    if(response.errors) {
                        setFormError(response.errors);
                    } else {
                        setShowToast(true);
                        setAlertMessage("Employee added successfully.");
                        setTimeout(() => {
                            navigate("/employeeList");
                        }, 1000);   
                    }
            }).catch(err => {
                setShowToast(true);
                setAlertMessage(err);
            })
        } catch (error) {
            setShowToast(true);
            setAlertMessage(error);
        }
    }

    const handleUpdateEmployee=(employeeForm)=>{
        try {
            updateEmployee(employeeForm).then(response=>{
                if(response.errors) {
                    setFormError(response.errors);
                } else {
                    setShowToast(true);
                    setAlertMessage("Employee added successfully.");
                    setTimeout(() => {
                        navigate("/employeeList");
                    }, 1000);   
                }
            }).catch(err => {
                setShowToast(true);
                setAlertMessage(err);
            })
        } catch (error) {
            setShowToast(true);
            setAlertMessage(error);
        }
    }

    const handleCancel=()=>{
        navigate("/employeeList");
    }


  return (
    <Container fluid="md" className="mt-5">
        <Row>
            <Col/>
            <Col>
                <h4 className="text-center">Add Employee</h4>
                <Card className="p-4 mt-4" style={{ width: '50rem' }}>
                    <Form noValidate validated={validated} onSubmit={handleSubmitForm}>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>First Name*</Form.Label>
                            <Form.Control type="text" placeholder="Enter first Name"
                                value={employeeForm.firstName} 
                                name="firstName"
                                onChange={handleInput}
                                readOnly={disableInput}
                                required/>
                                <Form.Control.Feedback type="invalid">
                                    Please enter the first name
                                </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name*</Form.Label>
                            <Form.Control type="text" placeholder="Enter last Name" 
                                value={employeeForm.lastName} 
                                name="lastName"
                                onChange={handleInput}
                                readOnly={disableInput}
                                required />
                            <Form.Control.Feedback type="invalid">
                                    Please enter the last name
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="mobile">
                            <Form.Label>Mobile No*</Form.Label>
                            <Form.Control type="number" placeholder="Enter mobile no"
                                value={employeeForm.mobile} 
                                name="mobile"
                                onChange={handleInput}
                                readOnly={disableInput || defaultInputDisable}
                                maxLength="10"
                                required />
                            <Form.Control.Feedback type="invalid">
                                    Please enter the mobile no
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="age">
                            <Form.Label>Age*</Form.Label>
                            <Form.Control type="number" placeholder="Enter age"
                                value={employeeForm.age} 
                                name="age"
                                readOnly={disableInput || defaultInputDisable}
                                onChange={handleInput}
                                required/>
                            <Form.Control.Feedback type="invalid">
                                    Please enter the age
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="department">
                            <Form.Label>Department</Form.Label>
                            <Form.Select aria-label="Select Department" required
                                value={employeeForm.department} name="department" onChange={handleInput}>
                                <option value="">Select Department</option>
                                <option value="HR">HR</option>
                                <option value="ENGINEERING">Engineering</option>
                                <option value="PLANNING">Planning</option>
                                <option value="MARKETING">Marketing</option>
                                <option value="SALES">Sales</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                    Please select department
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="designation">
                            <Form.Label>Designation</Form.Label>
                            <Form.Select aria-label="Select Designation" required
                                value={employeeForm.designation} name="designation" onChange={handleInput} >
                                <option value="">Select Designation</option>
                                <option value="DIRECTOR">Director</option>
                                <option value="MANAGER">Manager</option>
                                <option value="ADMINISTRATOR">Administrator</option>
                                <option value="ENGINEER">Engineer</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                    Please select designation
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Select aria-label="Select Gender" required disabled={disableInput || defaultInputDisable}
                                value={employeeForm.gender} name="gender" onChange={handleInput} >
                                <option value="">Select Gender</option>
                                <option value="MALE">MALE</option>
                                <option value="FEMALE">FEMALE</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                    Please select gender
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="maritalStatus">
                            <Form.Label>Married</Form.Label>
                            <Form.Check
                                inline
                                style={{marginLeft:"40px", marginTop:"10px"}}
                                onChange={handleInput}
                                name="maritalStatus"
                                type="radio"
                                value="Yes"
                                checked={employeeForm.maritalStatus==="Yes"}
                                label="Yes"
                            />
                            <Form.Check
                                inline
                                onChange={handleInput}
                                checked={employeeForm.maritalStatus==="No"}
                                value="No"
                                name="maritalStatus"
                                type="radio"
                                label="No"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="dateOfBirth">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="date" placeholder="Enter date of birth" 
                                value={employeeForm.dateOfBirth} 
                                readOnly={disableInput || defaultInputDisable}
                                name="dateOfBirth"
                                max={new Date().toISOString().split('T')[0]}
                                onChange={handleInput} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control as="textarea" rows={3} placeholder="Enter address" 
                                value={employeeForm.address} 
                                name="address"
                                onChange={handleInput}/>
                        </Form.Group>
                        {formError && formError.map((item,index)=>{
                            return (
                                <Alert key={index} variant="warning">
                                       {item}
                                </Alert>
                            ) 
                        })}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button style={{marginLeft:"10px"}} variant="primary" type="button" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Form>
                </Card>
            </Col>
            <Col/>
        </Row>
        <ToastComponent isOpen={showToast} message={alertMessage} closeToast={() => setShowToast(false)}/>
    </Container>
  );
}

export default AddEmployee;