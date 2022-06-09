import React, {} from 'react';
import {Container} from 'react-bootstrap';
import SignUp from './SignUp';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from './Dashboard';
import Login from './Login';
import RequireAuth from './RequireAuth';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';


export default function Trial() {
  return (

      <Container className="d-flex justify-content-center align-items-center"
            style={{minHeight: "100vh"}}>
            <div className="w-100" style={{maxWidth:'400px'}}>
              <Router>
                <AuthProvider>
                  <Routes>
                    <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
                    <Route path="/update-profile" element={<RequireAuth><UpdateProfile /></RequireAuth>} />
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/forgot-password' element={<ForgotPassword/>}/>
                  </Routes>
                </AuthProvider>
              </Router>
              
            </div>  
      </Container>

  );
}
