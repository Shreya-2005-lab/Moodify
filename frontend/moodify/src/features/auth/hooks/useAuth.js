import { login, register, getMe , logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth =()=>{
  const context = useContext(AuthContext)
  const {user, setUser, loader, setLoader, error, setError} = context

  async function handleRegister({username, email, password}) {
    setLoader(true)
    setError(null)
    try {
      const data = await register({username, password, email})
      setUser(data.user);
    } catch(err) {
      setError(err.response?.data?.message || "Registration failed")
    }
    setLoader(false)
  }

  async function handleLogin({username, email, password}) {
    setLoader(true)
    setError(null)
    try {
      const data = await login({username, password, email})
      setUser(data.user);
    } catch(err) {
      setError(err.response?.data?.message || "Login failed")
    }
    setLoader(false)
  }
  async function getMeHandler() {
    setLoader(true);
    try {
      const data = await getMe();
      setUser(data.user)
    } catch(err) {
      console.error("Get me error:", err)
    }
    setLoader(false)
  }

  async function logoutHandler() {
    setLoader(true);
    setError(null)
    try {
      const data = await logout();
      setUser(null)
    } catch(err) {
      setError(err.response?.data?.message || "Logout failed")
    }
    setLoader(false)
  }

  useEffect(()=>{
    getMeHandler()
  },[])
 return({
  user, loader, setLoader, setUser, handleLogin, getMeHandler, handleRegister, logoutHandler, error, setError
 }) 
}