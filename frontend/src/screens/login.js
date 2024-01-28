import React,{useState} from 'react';
import Button from 'react-bootstrap/Button';
import {Form, Card, Container, Row, Col, Alert} from 'react-bootstrap';
import { login } from '../utils/APIUtil';
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from '../constants';

function Login() {

    const [userName,setUserName] = useState(""); 
	const [password,setPassword] = useState(""); 
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const navigate = useNavigate();
    
    const handleSubmitForm=(event)=>{
        event.preventDefault();
		const formData={userName:userName,password:password}; 
        handleLogin(formData);
	}

    const handleLogin = (formData)=>{
        try {
            login(formData).then(response=>{
                if(response.message === "success"){
                    setShowAlert(false);
                    localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                    navigate("/employeeList");
                } else {
                    setShowAlert(true);
                    setAlertMessage("Please enter the valid UserName and Password.");
                }
            }).catch(err => {
                setAlertMessage(err);
            })
        } catch (error) {
            setAlertMessage("oops something went wrong please try again after some time.");
        }
    }

  return (
    <Container fluid="md" className="mt-5">
        <Row>
        <Col/>
        <Col>
        <Card className="p-4" style={{ width: '30rem' }}>  
            <h4 className="text-center">Login</h4>
            <Form onSubmit={handleSubmitForm}>
                <Form.Group className="mb-3" controlId="userName">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control type="text" placeholder="Enter UserName" 
                        value={userName} 
                        onChange={(e)=>setUserName(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" 
                      value={password} 
                      onChange={(e)=>setPassword(e.target.value)}  required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            {showAlert && <Alert variant="warning" className="mt-2">
               {alertMessage}
            </Alert>}
        </Card>
        </Col> 
        <Col/>
        </Row> 
    </Container>
  );
}

export default Login;