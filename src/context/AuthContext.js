import React, { useContext, useEffect, useState } from 'react';
import {auth} from '../firebase-config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    resetPassword,
    sendPasswordResetEmail,
    updateEmail, 
    updatePassword

  } from "firebase/auth";

const AuthContext = React.createContext();//creating the context
//this is a hook that is going to be imported and used to provide
//the context
export function useAuth(){
    return useContext(AuthContext);
}


//this is the default function to be exported
export function AuthProvider({children}) {
    const[currentUser, setCurrentUser] = useState();
    const[loading, setLoading] = useState(true);

    function signup(email, password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
    }

    function updateEmail(email) {
        return updateEmail(auth, email)
    }

    function updatePassword(password) {
        return auth.currentUser.updatePassword(password)
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>
            setCurrentUser(user));
            setLoading(false);
        return unsubscribe;
    },[])


    const value = {
        currentUser,
        signup,//this is in order for us to use the sigup method
        login,
        logout,
        resetPassword,
        updateEmail, 
        updatePassword,
    }

  return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
  )
}
