import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import '../style/faceexpression.scss'

const moodEmoji = {
  happy: "😊",
  sad: "😢",
  surprised: "😲",
  neutral: "😐",
};

export default function FaceExpression({ setMood }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    async function setup() {
      await init({ landmarkerRef, videoRef, streamRef });
      setIsInitializing(false);
    }
    setup();

    return () => {
      if (landmarkerRef.current) landmarkerRef.current.close();
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  function handleDetect() {
    detect({ landmarkerRef, videoRef, setExpression: (mood) => {
      setExpression(mood);
      if (setMood) setMood(mood);  // Parent ko mood bhejo
    }});
  }

  return (
    <div className="face-expression">

      {/* Heading */}
      <div className="face-expression__header">
        <h2 className="face-expression__title">Scan Your Face</h2>
        <p className="face-expression__subtitle">
          Let us detect your vibe!
        </p>
      </div>

      {/* Video */}
      <div className="face-expression__video-wrapper">
        {isInitializing && (
          <div className="face-expression__loader">
            <span />
            <span />
            <span />
          </div>
        )}
        <video
          ref={videoRef}
          className="face-expression__video"
          playsInline
        />
      </div>

      {/* Expression Result */}
      <div className="face-expression__result">
        {expression ? (
          <>
            <span className="face-expression__emoji">
              {moodEmoji[expression] || "😐"}
            </span>
            <p className="face-expression__mood">{expression}</p>
          </>
        ) : (
          <p className="face-expression__detecting">
            {isInitializing ? "Initializing camera..." : "Ready to scan!"}
          </p>
        )}
      </div>

      {/* Button */}
      <button
        className="face-expression__btn"
        onClick={handleDetect}
        disabled={isInitializing}
      >
        <span>🎵</span>
        Capture My Mood
        <span className="face-expression__btn-arrow">→</span>
      </button>

    </div>
  );
}
