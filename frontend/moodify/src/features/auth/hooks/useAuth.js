import { login, register, getMe , logout } from "../services/auth.api";
import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";

export const useAuth =()=>{
  const context = useContext(AuthContext)
  const {user, setUser, loader, setLoader} = context

  async function handleRegister({username, email, password}) {
    setLoader(true)
    const data = await register({username, password, email})
    setUser(data.user);
    setLoader(false)
  }

  async function handleLogin({username, email, password}) {
    setLoader(true)
    const data = await login({username, password, email})
    setUser(data.user);
    setLoader(false)
  }
  async function getMeHandler() {
    setLoader(true);
    const data = await getMe();
    setUser(data.user)
    setLoader(false)
  }

  async function logoutHandler() {
    setLoader(true);
    const data = await logout();
    setUser(null)
    setLoader(false)
  }

  useEffect(()=>{
    getMeHandler()
  },[])
 return({
  user, loader, setLoader, setUser, handleLogin, getMeHandler, handleRegister, logoutHandler
 }) 
}