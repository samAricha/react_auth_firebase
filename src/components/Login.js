import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const{login, currentUser} = useAuth();
    const [error, setError] = useState('');//used to store the error message.
    const [loading, setLoading] = useState(false);//used for loading
    //state when button for signing up is clickeda
    const [success, setSuccess] = useState(false)

    let navigate = useNavigate();//navigates us to various destination

    async function handleSubmit(e){
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            setSuccess(true);
            console.log("logged in");   
            navigate('/');

        } catch (error) {
          setError("Failed to log in");
          console.log(error) 
        }
        setLoading(false);
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Log In</h2>
                {error &&<Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{currentUser.email}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>  
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required/>
                    </Form.Group>
                    <br/>
                    <Button disabled={loading} className="w-100" type='submit'>Log In</Button>              
                </Form>
                <div className='w-100 text-center mt-2'>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Need an account? <Link to='/signup'>Sign Up</Link>
        </div>
    </>
  )
}
