import { getSong } from "../service/song.api";
import { useContext } from "react";
import { SongContext } from "../song.context";

export const useSong=()=>{
const context = useContext(SongContext)

const {loading, setLoading, song, setSong} = context;

async function handleSetSong({mood}) {
  setLoading(true);
  try {
    const data = await getSong({ mood})
    if (data?.song) {
      const cleanedSong = {
        ...data.song,
        title: String(data.song.title || "")
          .replace(/paagalNew/gi, "")
          .replace(/\s{2,}/g, " ")
          .trim(),
      };
      setSong(cleanedSong)
    }
  } catch (error) {
    console.error("Error fetching song:", error)
  } finally {
    setLoading(false)
  }
}

return{
  loading, handleSetSong, song
}
}