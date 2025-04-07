"use client";
import React, { useState, useEffect } from "react"; // Añade useEffect aquí
import { createRoot } from "react-dom/client";
import PDF from "../generatepdf/PDF";
import useRecord from "@/hooks/useRecord";
import useStudent from "@/hooks/useStudent";

interface Workshop {
  id: number;
  nombre: string;
  date: string;
}

interface ExpedienteData {
  exp: number;
  workshops: Workshop[];
}

interface Student {
  expediente: number;
  lego_image: string;
  url_image: string;
}

export default function DownloadPdfButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { fetchExpediente, data } = useRecord<ExpedienteData>();
  const { fetchStudentInfo, dataStudent } = useStudent<Student>();

  const [storedCode, setStoredCode] = useState<string | null>(null);

  // Ahora useEffect está correctamente importado
  useEffect(() => {
    const code = localStorage.getItem("expedienteCode");
    setStoredCode(code);
    if (code) fetchExpediente(code);
    if (code) fetchStudentInfo(code);
  }, []);

  const generatePDF = async () => {
    if (!data || !storedCode || isGenerating) return;
    
    setIsGenerating(true);
    
    try {
      const container = document.createElement("div");
      container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        background: white;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        overflow: auto;
      `;

      const element = document.createElement("div");
      element.id = "pdf-content";
      element.style.cssText = `
        width: 850px;
        background: white;
        position: relative;
      `;

      container.appendChild(element);
      document.body.appendChild(container);

      const root = createRoot(element);
      if (dataStudent) {
        root.render(<PDF data={data} dataStudent={dataStudent} />);
      } else {
        console.error("dataStudent is null and cannot be passed to PDF component.");
        alert("Error: Información del estudiante no disponible.");
      }

      await new Promise(resolve => setTimeout(resolve, 1000));

      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf()
        .set({
          margin: 0,
          filename: `${storedCode}.pdf`,
          html2canvas: {
            scale: 1,
            scrollY: 0,
            windowHeight: element.scrollHeight + 100,
            useCORS: true,
            logging: true
          },
          jsPDF: {
            unit: "mm",
            format: "a4",
            orientation: "portrait"
          }
        })
        .from(element)
        .save();

    } catch (error) {
      console.error("Error generando PDF:", error);
      alert("Error al generar el PDF. Por favor intenta nuevamente.");
    } finally {
      const container = document.querySelector("#pdf-container");
      if (container) document.body.removeChild(container);
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating || !data}
      style={{
        display: "flex",
        alignItems: "center",
        borderRadius: "9999px",
        margin: "auto",
        width: "fit-content",
        height: "131px",
        backgroundColor: isGenerating ? "#FFDF6280" : "#FFDF62",
        transition: "all 100ms",
        cursor: data ? "pointer" : "not-allowed",
        padding: "0 1.5rem"
      }}
      className="hover:scale-105"
    >
      <span style={{
        fontWeight: "bold",
        fontSize: "1.5rem",
        opacity: isGenerating ? 0.7 : 1
      }}>
        {isGenerating ? "Generando..." : "DESCARGA TU PDF"}
      </span>
    </button>
  );
}