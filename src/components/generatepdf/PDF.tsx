"use client";
import React from "react";
import Perfil from "./Perfil";
import Bloques1 from "./Bloques1";
import Bloques2 from "./Bloques2";
import Tablas from "./Tablas";
import Background from "./Background";

interface PDFProps {
  data: {
    exp: number;
    workshops: {
      id: number;
      nombre: string;
      date: string;
    }[];
  };
  dataStudent: {
    expediente: number;
    lego_image: string;
    url_image: string;
  };
}

function PDF({ data, dataStudent }: PDFProps) {
  return (
    <div style={{ 
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "white",
      position: "relative", // Añadido
      minHeight: "100vh",
      paddingBottom: "150px"
    }}>
  
      <Background />

      <div style={{ 
        width: "100%",
        maxWidth: "820px", // Ancho máximo para contenido
        position: "relative"
      }}>
        <Bloques1 />   
        <Perfil exp={dataStudent.expediente} urlImage={dataStudent.url_image} />
        <Tablas workshops={data.workshops} />
        </div>

      <div style={{ 
        position: "fixed",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "1000px",
        zIndex: 3
      }}>
        <Bloques2 />
      </div>
    </div>
  );
}

export default PDF;

