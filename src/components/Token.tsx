
// import { Token } from "../interfaces";
// import { useState } from "react";

import { useState } from "react";

export default function TokenComponent({ token, onSelect }) {

  let pfp = token.toString();
  const [isHovered, setIsHovered] = useState(false);

  return (

    <div 
      style={{ position: "relative", display: "inline-block", cursor: "pointer" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* Main Image */}
      <img 
        src={`https://forge404.s3.eu-north-1.amazonaws.com/blackforge-nfts/${pfp}.png`} 
        style={{
          width: "180px", 
          height: "auto", 
          border: "1px solid white", 
          borderRadius: "4px"
        }} 
        alt={`NFT ${pfp}`}
      />

      {/* Hover Image and Text */}
      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 0,
            width: "180px",
            height: "auto",
            borderRadius: "4px",
            opacity: 0.8,
            textAlign: "center",
            color: "white",
            fontSize: "14px",
            fontWeight: "bold",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => onSelect(pfp)}
        >
          <img 
            src="/images/dissolvenow.gif"
            alt="Dissolve"
            style={{
              width: "100%",
              borderRadius: "4px",
            }}
          />
          <div style={{
            position: "absolute",
            top: "71%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "rgba(0, 0, 0, 0.0)",
            padding: "10px 12px 8px 12px",
            borderRadius: "0px",
            fontFamily: "arial, verdana",
            color: "black",
            fontSize: "16px",
            fontWeight: "normal",
            width: "118px",
            backgroundColor: "white"
          }}>
            Click to Dissolve
          </div>
        </div>
      )}

      <br/>
      <span style={{ fontSize: "11px", fontFamily: "Arial, sans-serif" }}>#{pfp}</span>
    </div>
  );
  
}

