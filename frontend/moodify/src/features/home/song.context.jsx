// import { Children } from "react";
import { useState } from "react";
import { createContext } from "react"; 

export const SongContext = createContext();

export const SongContextProvider = ({children})=>{
const [song, setSong] = useState(
  // "url": "https://ik.imagekit.io/8012wepsw/Moodify/songs/Tum_Ho_-_PagalNew__R0P1kfHoc.mp3",
  // "posterUrl": "https://ik.imagekit.io/8012wepsw/Moodify/posters/Tum_Ho_-_PagalNew__nDdsVvgDQ.jpeg",
  // "title": "Tum Ho - PagalNew ",
  // "mood": "neutral"
  null
)

const [loading, setLoading ] = useState(false)

return (
  <SongContext.Provider
  value={{loading, setLoading, song, setSong}}>
  {children}
  </SongContext.Provider>
)
}
