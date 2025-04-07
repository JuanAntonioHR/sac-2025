import React from "react";
import ProfileImageGenerator from "./ProfileImageGenerator";

interface PerfilProps {
  exp: number;
  urlImage: string;
}

function Perfil({ exp, urlImage }: PerfilProps) {
  return (
    <div style={{ 
      position: "relative", // Cambiado de absolute a relative
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginBottom: "40px" // Espacio antes de las tablas
    }}>
      <div style={{ 
        position: "absolute", 
        left: "75px",
        top: "60px"
      }}>
        <img style={{ width: '12vh', height: '5vh' }} src="/Logo.png" alt="Logo" />
      </div>
      
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        marginTop: "85px" // Reemplaza el posicionamiento absoluto
      }}>
        <ProfileImageGenerator urlImage={urlImage} />
        <div style={{
          color: 'black', 
          fontSize: '35px', 
          fontFamily: 'Cera Pro', 
          fontWeight: '700',
          marginTop: '-5px'
        }}>
          {exp}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
