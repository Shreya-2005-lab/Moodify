import { useEffect, useRef, useState } from "react";
import "../pages/styles/faceExpression.scss"
import {
  setupFaceLandmarker,
  startCamera,
  detectFaceExpression,
} from "../utils/Utils";

import { useSong } from "../../home/hooks/useSong";

export default function FaceExpression({ setDetected }) {

  const videoRef = useRef(null);

  const [expression, setExpression] =
    useState("No expression detected");

  const faceLandmarkerRef =
    useRef(null);

  const { handleSetSong } =
    useSong();

  useEffect(() => {

    async function initialize() {

      const landmarker =
        await setupFaceLandmarker();

      faceLandmarkerRef.current =
        landmarker;

      await startCamera(videoRef);
    }

    initialize();

  }, []);

  // async function handleDetectExpression() {

  //   const detectedExpression =
  //     detectFaceExpression(
  //       faceLandmarkerRef.current,
  //       videoRef.current
  //     );

  //   console.log(
  //     detectedExpression
  //   );

  //   setExpression(
  //     detectedExpression
  //   );

  //   // FETCH SONG
  //   await handleSetSong({
  //     mood:
  //       detectedExpression,
  //   });
  // }

  async function handleDetectExpression() {

  const detected =
    detectFaceExpression(
      faceLandmarkerRef.current,
      videoRef.current
    );

  setExpression(
    detected.label
  );

  // SHOW PLAYER
  if (setDetected) {
    setDetected(true);
  }

  await handleSetSong({
    mood: detected.mood,
  });
}

  return (
   <div className="face">
      <h1>
        Face Expression Detector
      </h1>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="500"
        style={{
          borderRadius: "12px",
          border:
            "2px solid black",
        }}
      />

      <button
        onClick={
          handleDetectExpression
        }
      >
        Detect Expression
      </button>

      <h2>{expression}</h2>
    </div>
  );
}