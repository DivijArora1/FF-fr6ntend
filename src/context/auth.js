import { useState, useEffect, useContext, createContext } from "react";
//use se use,create se create krengai
import axios from "axios";
const AuthContext = createContext()//just like navigate

//globally enable [auth,''']
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,//initially
        token: "",
    });
    //default axios
    axios.defaults.headers.common['Authorization'] = auth?.token
    //set headers..= if we get the auth pass token

    //jb deta ajaiga ..toh usse store krna hoga vrna reload pr chala jaiga
    useEffect(() => {
        const data = localStorage.getItem('auth')
        if (data) {
             const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }
        //this line will avoid the error in console(continues execution-continues watch mode in on)
        //eslint-disable-next-line
    }, [])
    return (
        //just like we Wrapped App.js in index.js from browserRouter
        //to access the state ..we need to pass the value
        <AuthContext.Provider value={[auth, setAuth]} >
            {children}
        </AuthContext.Provider>
    )
}
//custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };