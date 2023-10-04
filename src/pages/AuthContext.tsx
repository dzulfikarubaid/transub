import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

export const AuthContext = createContext()
export const AuthContextProvider = ({ children }:any) => {
    const [currentUser, setCurrentUser] = useState({})
    useEffect(
        () => {
            onAuthStateChanged(auth, (user:any) => {
                setCurrentUser(user)
            })
        },[]
    ) 
    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}
