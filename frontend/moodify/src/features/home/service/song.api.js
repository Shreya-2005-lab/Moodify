import axios from "axios";
const api = axios.create({
  baseURL:"https://moodify-1-z2b5.onrender.com/",
  withCredentials:true,
})

export async function getSong({mood}) {
  const response =await api.get("/api/songs/getsong?mood=" + mood)
  return response.data
}