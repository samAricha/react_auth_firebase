import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ForgotPassword() {
    const emailRef = useRef();
    const{resetPassword, currentUser} = useAuth();
    const[message, setMessage] = useState('');
    const [error, setError] = useState('');//used to store the error message.
    const [loading, setLoading] = useState(false);//used for loading
    //state when button for signing up is clickeda

    async function handleSubmit(e){
        e.preventDefault();

        try {
            setMessage('');
            setError('');
            setLoading(true);
            await resetPassword(emailRef.current.value);
            console.log("password reset");   
            setMessage("Check your inbox for further instructions")
        } catch (error) {
          setError("Failed to reset password");
          console.log(error) 
        }
        setLoading(false);
    }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Password Reset</h2>
                {error &&<Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required/>
                    </Form.Group>  
                    <br/>
                    <Button disabled={loading} className="w-100" type='submit'>Reset Password</Button>              
                </Form>
                <div className='w-100 text-center mt-2'>
                    <Link to="/login">Log In?</Link>
                </div>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Need an account? <Link to='/signup'>Sign Up</Link>
        </div>
    </>
  )
}
