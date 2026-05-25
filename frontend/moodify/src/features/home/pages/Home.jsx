import React, { useEffect, useState } from "react";

import { useAuth } from "../../auth/hooks/useAuth";
import FaceExpression
from "../../expressions/component/FaceExpression";


import "../styles/home.scss";
import Player from "../components/Player";

const Home = () => {
  const { user, logoutHandler } = useAuth();

  const [
    detected,
  setDetected
  ] = useState(false);

  const [
    showCamera,
  setShowCamera
  ] = useState(true);

  useEffect(() => {
    setDetected(false);
    setShowCamera(true);
  }, []);

  return (

    <div className="home">
      {user && (
        <div className="home__user-card">
          <div className="home__user-avatar">{String(user?.username || user?.name || "U")[0].toUpperCase()}</div>
          <div className="home__user-info">
            <span>{user?.username || user?.name || "Moodify User"}</span>
            <button onClick={logoutHandler}>logout</button>
          </div>
        </div>
      )}

      {/* SHOW PLAYER ONLY AFTER DETECTION */}
      {detected && <Player/>}

      {/* CAMERA */}
      {showCamera && (

        <div
          className={
            detected
              ? "home__face minimized"
              : "home__face"
          }
        >

          {detected && (
            <button
              className="close-btn"
              onClick={() =>
                setShowCamera(false)
              }
            >
              ✕
            </button>
          )}

          <FaceExpression
            detected={detected}
            setDetected={setDetected}
          />

        </div>

      )}

    </div>
  );
};

export default Home;