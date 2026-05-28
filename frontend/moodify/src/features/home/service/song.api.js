import axios from "axios";
const api = axios.create({
  baseURL:"https://moodify-backend-ibs8.onrender.com",
  withCredentials:true
})

export async function getSong({mood}) {
  const response =await api.get("/api/songs/getsong?mood=" + mood)
  return response.data
}