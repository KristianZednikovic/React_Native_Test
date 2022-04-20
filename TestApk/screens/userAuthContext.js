
// import { createContext, useEffect, useState, useContext } from 'react';
// import { 
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword, 
//     signOut, 
//     onAuthStateChanged 
// } from 'firebase/auth';
// import { auth } from "./../database/firebase-config";

// const userAuthContext = createContext();

// export function UserAuthContextProvider({ children }) {

//     const [user, setUser] = useState("");

//     function signUp(email, password) {
//         return createUserWithEmailAndPassword(auth, email, password);
//     }

//     function login(email, password) {
//         return signInWithEmailAndPassword(auth, email, password);
//     }

//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, (currenUser) => {
//             setUser(currenUser);
//         })
//         return () => {
//             unsubscribe();
//         }
//     }, []);

//     return <userAuthContext.Provider value={}>{children}</userAuthContext.Provider>
// }

// export function useUserAuth() {
//     return useContext(userAuthContext);
// }