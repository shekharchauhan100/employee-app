import React,{useEffect, useState} from 'react';
import {Table, Container, Card, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { deleteEmployee, filterEmployeeList, getEmployeeList, searchEmployeeById } from '../utils/APIUtil';
import ToastComponent from '../components/toastComponet';
import { ACCESS_TOKEN } from '../constants';

const Years = ["1998","1999","2000","2001","2002","2003","2004","2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024"];

function EmployeeList() {
    const [employeeList, setEmployeeList] = useState([]);
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [filterForm, setFilterForm] = useState({
        firstName:"",
        birthYear:"",
        ageFrom:"",
        ageTo:""
    });
    const [showClear, setShowClear] = useState(false);

   const navigateToAddEmployee =()=>{
    navigate("/addEmployee");
    }

    useEffect(() => {
        handleEmployeeList();
      },[]);

    const handleEmployeeList=()=>{
        try {
            let optionalUrl = "employees";
            getEmployeeList(optionalUrl).then(response=>{
                setEmployeeList(response);
            }).catch(err => {
                setShowToast(true);
                setAlertMessage(err);
            });
        } catch (error) {
            setShowToast(true);
            setAlertMessage(error);
        }
    }

    const handleEdit=(employeeId)=>{
        navigate(`/editEmployee/${employeeId}`);
    }

    const handleDelete=(employeeId)=>{
        deleteEmployee(employeeId).then(response=>{
            setShowToast(true);
            setAlertMessage(`${employeeId} is deleted successfully`);
            handleEmployeeList();
        });
    }

    const searchInput = (event) => {
        const searchText = event.target.value;
        if(searchText && searchText.length > 2) {
            try {
            searchEmployeeById(searchText).then(response => {
                setEmployeeList(response);
            }).catch(err => {
                setShowToast(true);
                setAlertMessage(err);        
              });
            } catch(error) {
                setShowToast(true);
                setAlertMessage(error);           
            }
        } else {
            handleEmployeeList();
        }
    }


    const handleInput = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFilterForm({ ...filterForm, [name] : value});
    }

    const handleFilterSubmit = (e)=> {
            e.preventDefault();
            setShowClear(true);
            try {
                let optionalUrl = "employees?";
                let optionParameter = "";
                for (let [key, value] of Object.entries(filterForm)) {
                    if(value){
                        optionParameter += key+"="+value+"&"
                    }
                }
                optionalUrl = optionalUrl+optionParameter;
                getEmployeeList(optionalUrl).then(response=>{
                    setEmployeeList(response);
                }).catch(err => {
                    setShowToast(true);
                    setAlertMessage(err);
                });
            } catch(error) {
                setShowToast(true);
                setAlertMessage(error);           
            }
    }

    const handleClearFilter = () => {
        setShowClear(false);
        setFilterForm({
            firstName:"",
            birthYear:"",
            ageFrom:"",
            ageTo:""
        });
        handleEmployeeList();
    }

    const handleLogout = ()=>{
        localStorage.clear();
        navigate("/");
    }   

  return (
    <Container fluid="md" className="mt-5">
        <Row>
            <Col md={4}>
                <Form.Control
                    className="rounded-pill"
                    type="text"
                    style={{width:"300px"}}
                    placeholder="Search by employee id ..."
                    id="searchInput"
                    onChange={searchInput}
                />
            </Col>
            <Col md={4}>
            <h4>Employee List</h4>
            </Col>
            <Col className="text-end">
             <Button variant="primary" onClick={navigateToAddEmployee}>Add Employee</Button>
             <Button variant="danger" style={{marginLeft:"10px"}} onClick={handleLogout}>Logout</Button>
            </Col>
        </Row>
        <Form onSubmit={handleFilterSubmit}>
            <Row className="mt-3">
                <Form.Group as={Col} md="2" controlId="firstName">
                <Form.Control
                    type="text"
                    className="rounded-pill"
                    name="firstName"
                    placeholder="Enter name"
                    value={filterForm.firstName}
                    onChange={handleInput}
                />
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="birthYear">
                    <Form.Select aria-label="Select Year" className="rounded-pill"
                        value={filterForm.birthYear} name="birthYear" onChange={handleInput}>
                        <option value="">Select Year</option>
                        {Years.map((item,index)=>{
                            return(
                                <option key={index} value={item}>{item}</option>
                            )
                        })}
                        
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="ageFrom">
                <Form.Control
                    className="rounded-pill"
                    type="number"
                    name="ageFrom"
                    placeholder="Age from"
                    value={filterForm.ageFrom}
                    onChange={handleInput}
                />
                </Form.Group>
                <Form.Group as={Col} md="2" controlId="ageTo">
                <Form.Control
                    className="rounded-pill"
                    type="number"
                    name="ageTo"
                    placeholder="Age to"
                    value={filterForm.ageTo}
                    onChange={handleInput}
                />
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom02" className="text-end">
                    {showClear && <Button variant="link" type="button" onClick={()=>{handleClearFilter()}}>
                        clear Filter
                    </Button>}
                    <Button variant="primary" type="submit">
                        Apply Filter
                    </Button>
                </Form.Group>
            </Row>
        </Form>
        <Card className="mt-4 p-3">
        <Table responsive striped bordered hover>
            <thead>
            <tr>
                <th>Employee Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Mobile</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Age</th>
                <th>Address</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                {employeeList.length > 0 && employeeList.map((item,index)=>{
                   return ( <tr key={index}>
                    <td>{item.employeeId}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.mobile}</td>
                    <td>{item.gender}</td>
                    <td>{item.dateOfBirth}</td>
                    <td>{item.department}</td>
                    <td>{item.designation}</td>
                    <td>{item.age}</td>
                    <td>{item.address}</td>
                    <td>
                        <Button variant="link" type="button" onClick={()=>handleEdit(item.employeeId)}>Edit</Button> 
                        <Button variant="link" type="button" onClick={()=>handleDelete(item.employeeId)}>Delete</Button>
                    </td>
                </tr>)
                })
                }
            </tbody>
        </Table>
        </Card>
       <ToastComponent isOpen={showToast} message={alertMessage} closeToast={() => setShowToast(false)}/>
    </Container>
  );
}

export default EmployeeList;