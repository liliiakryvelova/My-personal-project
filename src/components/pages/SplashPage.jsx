// src/components/SplineSplash.js
import React from "react";

const SplineSplash = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000",
        overflow: "hidden",
      }}
    >
      <iframe
        src="https://my.spline.design/particles-hBSBgx72ycnJvr2VDaECr0cG/"
        frameBorder="0"
        width="100%"
        height="100%"
        title="Spline Scene"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      ></iframe>

      {/* Lighter dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.25)", // lighter overlay (was 0.5)
          zIndex: 1,
          pointerEvents: "none",
        }}
      ></div>

      {/* More intense shining text */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "3rem",
          fontWeight: "bold",
          textAlign: "center",
          pointerEvents: "none",
          zIndex: 2,

          background:
            "linear-gradient(90deg, #ffffff, #ffffcc, #ffffff, #ffffcc, #ffffff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shine 1.2s infinite linear", // faster shine
          backgroundSize: "200% auto",
          textShadow: "0 0 20px rgba(255,255,255,0.8)", // brighter glow
        }}
      >
        Welcome to NexBot
      </div>
      <style>
        {`
          @keyframes shine {
            0% {
              background-position: -200%;
            }
            100% {
              background-position: 200%;
            }
          }

          div {
            background-size: 200% auto;
          }
        `}
      </style>

    </div>
  );
};

export default SplineSplash;
