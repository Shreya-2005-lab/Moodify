import "../styles/player.scss";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  FastForward,
  Rewind,
} from "lucide-react";

import { useSong } from "../hooks/useSong";

const Player = () => {
  const { song, handleSetSong } = useSong();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !song?.url) return;

    audio.src = song.url;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.log(err);
      }
    };

    playAudio();

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [song]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  const handleFastForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
  };

  const handleRewind = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  };

  const handlePreviousSong = () => {
    if (song?.mood) {
      handleSetSong({ mood: song.mood });
    }
  };

  const handleNextSong = () => {
    if (song?.mood) {
      handleSetSong({ mood: song.mood });
    }
  };

  return (
    <div className="player">
      <div className="player__overlay">
        <div className="player__container">
          <div className="player__poster">
            <img
              src={song?.posterUrl}
              alt={song?.title}
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect fill='%23333' width='300' height='300'/%3E%3Ctext x='150' y='150' fill='%23fff' font-size='18' text-anchor='middle' dominant-baseline='middle'%3EMoodify%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>

          <div className="player__info">
            <div>
              <h1>{song?.title}</h1>
              <p>Mood: {song?.mood}</p>
            </div>
          </div>

          <div className="player__progress">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              style={{
                "--value": `${duration ? (currentTime / duration) * 100 : 0}%`,
              }}
              onChange={(e) => {
                const audio = audioRef.current;
                if (audio) {
                  audio.currentTime = Number(e.target.value);
                }
              }}
            />
          </div>

          <div className="player__time">
            <span>
              {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, "0")}
            </span>
            <span>
              {Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, "0")}
            </span>
          </div>

          <div className="player__controls">
            <button onClick={handlePreviousSong} className="skip-btn" title="Previous Song">
              <SkipBack />
            </button>

            <button onClick={handleRewind} className="scrub-btn" title="Rewind 10s">
              <Rewind />
            </button>

            <button className="play-btn" onClick={handlePlayPause}>
              {isPlaying ? <Pause /> : <Play />}
            </button>

            <button onClick={handleFastForward} className="scrub-btn" title="Forward 10s">
              <FastForward />
            </button>

            <button onClick={handleNextSong} className="skip-btn" title="Next Song">
              <SkipForward />
            </button>
          </div>

          <div className="player__volume">
            <Volume2 />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              style={{ "--value": `${volume * 100}%` }}
              onChange={(e) => {
                const newVolume = parseFloat(e.target.value);
                setVolume(newVolume);
              }}
              className="volume-slider"
            />
          </div>
        </div>
      </div>
      <audio ref={audioRef} />
    </div>
  );
};

export default Player;