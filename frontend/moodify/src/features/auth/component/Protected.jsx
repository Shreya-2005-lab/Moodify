import { useAuth } from "../hooks/useAuth";
import { Navigate, useNavigate } from "react-router";
import React from 'react'
import { Link } from "react-router";
import "../style/loading.scss";

const Protected = ({children}) => {
  const navigate = useNavigate();
  const{user, loader} =useAuth();

  if(loader){
    return (
      <div className="loading-container">
        <div className="loading-box">
          <h1>Moodify</h1>
          <div className="spinner"></div>
          <p>Please login to unlock your mood song or register if you're a new user</p>
          <div className="loading-links">
            <Link to="/login" className="link-btn login-btn">Login</Link>
            <Link to="/register" className="link-btn register-btn">Register</Link>
          </div>
        </div>
      </div>
    );
  }

  if(!user){
    return <Navigate to="/login"/>
  }

  return children;
}

export default Protected
