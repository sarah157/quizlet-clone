import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { login, getCurrentUser } from "../services/authService";
import {useFetch} from "../hooks/use-fetch"

const Login = () => {
    const usernameRef = useRef("");
    const passwordRef = useRef("");
    const { state } = useLocation();
    const navigate = useNavigate();
    const {func : _login, error} = useFetch(login)
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        _login(usernameRef.current.value, passwordRef.current.value)    
    }

    if (getCurrentUser() !== null && !error) {
        navigate(state?.path || "/latest");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    ref={usernameRef}
                    placeholder="username" />
                <input
                    ref={passwordRef}
                    placeholder="password" />
                <button>Submit</button>
                <p>{error}</p>
            </form>
        </div >
    );
}

export default Login;