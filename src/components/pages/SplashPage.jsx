// src/components/SplineSplash.js
import React from "react";
import "../../App.css"; 

const SplineSplash = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        width: "100vw",
        height: "85vh",
        backgroundColor: "#000",
        overflow: "hidden",
        position: "relative",
        padding: "2.5rem 0 2.5rem 2.5rem", // Add padding to the left and top/bottom outside the box
        boxSizing: "border-box",
      }}
    >
      {/* Left grid: Resume placeholder */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          background: "rgba(0,0,0,0.7)",
          zIndex: 2,
          height: "100%",
          borderRadius: "24px",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          border: "1.5px solid rgba(255,255,255,0.18)",
          backdropFilter: "blur(6px)",
          padding: "2.5rem 2.5rem", // Keep inner padding for box content
        }}
      >
        <h2 
          style={{
            marginBottom: "1rem",
            background:
            "linear-gradient(90deg, #ffffff, #ffffcc, #ffffff, #ffffcc, #ffffff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "shine 1.2s infinite linear",
            backgroundSize: "200% auto",
            textShadow: "0 0 20px rgba(255,255,255,0.8)",
            }}
        >My Resume</h2>
        <p className="crimson-text-regular">
          {/* Replace this with your actual resume or import a Resume component */}
          <strong>Name:</strong> Liliia Kryvelova
          <br />
          <strong>Title:</strong> Product Engineer/ Software Developer /Jira Integration Specialist
          <br />
          <strong>Email:</strong> lilia.krivelyova@gmail.com
          <br />
          <hr />
          <br />
          <strong>Skills:</strong>
          <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
            <li className="crimson-text-regular">Languages: JavaScript, Next.js, React.js, Node.js, Express, Tailwind</li>
            <li className="crimson-text-regular">Tools: Jira, Confluence, Git, Docker, Postman</li>
            <li className="crimson-text-regular">Methodologies: Agile, Scrum, DevOps</li>
            <li className="crimson-text-regular">Cloud & DevOps: AWS, Azure, GCP , CI/CD, Monitoring, Jira, Agile/Scrum</li>  
          </ul>
          <br />
          <hr />
          
            <strong>Experience:</strong> <br />
           ● Ford Motor Company (Jan 2024 – May 2025): Product Engineer / Software Developer / Jira Integration Specialist
          <br />
        
           ● Envorso, LLC (Nov 2022 – Dec 2023): Product Engineer / Software Developer 

        </p>
      </div>

      {/* Right grid: Spline animation with overlay */}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {/* <iframe
          src="https://my.spline.design/particles-hBSBgx72ycnJvr2VDaECr0cG/"
          frameBorder="0"
          width="100%"
          height="100%"
          title="Spline Scene"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0, // <== LOWER THAN MENU
          }}
        ></iframe>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.25)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        ></div> */}

       <h1 class="heading-1">Hello, World!</h1>
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
        `}
      </style>
    </div>
  );
};

export default SplineSplash;
