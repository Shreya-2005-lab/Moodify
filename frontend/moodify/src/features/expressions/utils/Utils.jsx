// Utils.jsx

import {
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

export async function setupFaceLandmarker() {

  const vision =
    await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );

  const faceLandmarker =
    await FaceLandmarker.createFromOptions(
      vision,
      {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
        },

        outputFaceBlendshapes: true,

        runningMode: "VIDEO",

        numFaces: 1,
      }
    );

  return faceLandmarker;
}

export async function startCamera(videoRef) {

  try {

    if (!videoRef?.current) {

      console.log(
        "VIDEO REF IS NULL"
      );

      return;
    }

    const stream =
      await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

    videoRef.current.srcObject =
      stream;

    await videoRef.current.play();

    return stream;

  } catch (error) {

    console.log(
      "CAMERA ERROR:",
      error
    );
  }
}

export function detectFaceExpression(
  faceLandmarker,
  video
) {

  if (
    !faceLandmarker ||
    !video
  ) {
    return {
      label: "😐 Neutral",
      mood: "neutral",
    };
  }

  const results =
    faceLandmarker.detectForVideo(
      video,
      performance.now()
    );

  if (
    !results.faceBlendshapes ||
    results.faceBlendshapes.length === 0
  ) {
    return {
      label: "😐 Neutral",
      mood: "neutral",
    };
  }

  const blendshapes =
    results.faceBlendshapes[0].categories;

  const scores = {};

  blendshapes.forEach((shape) => {

    scores[
      shape.categoryName
    ] = shape.score;
  });

  let label =
    "😐 Neutral";

  let mood =
    "neutral";

  // Smile
  if (
    scores.mouthSmileLeft > 0.45 &&
    scores.mouthSmileRight > 0.45
  ) {

    label =
      "😊 Smiling";

    mood =
      "smiling";
  }

  // Surprise
  else if (
    scores.jawOpen > 0.3 &&
    scores.browInnerUp > 0.01
  ) {

    label =
      "😲 Surprised";

    mood =
      "surprised";
  }

  // Sad
  else if (
    scores.mouthSmileLeft < 0.2 &&
    scores.mouthSmileRight < 0.2
  ) {

    label =
      "😢 Sad";

    mood =
      "sad";
  }

  // Blink
  else if (
    scores.eyeBlinkLeft > 0.5 ||
    scores.eyeBlinkRight > 0.5
  ) {

    label =
      "😉 Blinking";

    mood =
      "blinking";
  }

  return {
    label,
    mood,
  };
}