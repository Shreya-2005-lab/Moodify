// FaceExpression.jsx

import {
  useEffect,
  useRef,
  useState,
} from "react";

import "../pages/styles/faceExpression.scss";

import {
  setupFaceLandmarker,
  startCamera,
  detectFaceExpression,
} from "../utils/Utils";

import { useSong }
from "../../home/hooks/useSong";

export default function FaceExpression({
  setDetected,
}) {

  const videoRef =
    useRef(null);

  const [
    expression,
    setExpression,
  ] = useState(
    "No expression detected"
  );

  const faceLandmarkerRef =
    useRef(null);

  const {
    handleSetSong,
  } = useSong();

  useEffect(() => {

    let mounted = true;

    async function initialize() {

      try {

        if (!videoRef.current)
          return;

        const landmarker =
          await setupFaceLandmarker();

        if (!mounted)
          return;

        faceLandmarkerRef.current =
          landmarker;

        await startCamera(
          videoRef
        );

      } catch (error) {

        console.log(
          "INITIALIZE ERROR:",
          error
        );
      }
    }

    initialize();

    return () => {
      mounted = false;
    };

  }, []);

  // async function handleDetectExpression() {

  //   try {

  //     const detected =
  //       detectFaceExpression(
  //         faceLandmarkerRef.current,
  //         videoRef.current
  //       );

  //     console.log(
  //       detected
  //     );

  //     setExpression(
  //       detected.label
  //     );

  //     if (setDetected) {

  //       setDetected(true);
  //     }

  //     await handleSetSong({
  //       mood:
  //         detected.mood,
  //     });

  //   } catch (error) {

  //     console.log(
  //       "DETECTION ERROR:",
  //       error
  //     );
  //   }
  // }
  async function handleDetectExpression() {

  try {

    // Check if video is ready
    if (
      !videoRef.current ||
      videoRef.current.readyState < 2
    ) {

      console.log(
        "VIDEO NOT READY"
      );

      return;
    }

    const detected =
      detectFaceExpression(
        faceLandmarkerRef.current,
        videoRef.current
      );

    console.log(
      "DETECTED:",
      detected
    );

    setExpression(
      detected.label
    );

    if (setDetected) {

      setDetected(true);
    }

    await handleSetSong({
      mood:
        detected.mood,
    });

  } catch (error) {

    console.log(
      "DETECTION ERROR:",
      error
    );
  }
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
        muted
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

      <h2>
        {expression}
      </h2>

    </div>
  );
}