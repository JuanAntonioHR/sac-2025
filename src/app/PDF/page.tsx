"use client";

import React, { useState, useEffect } from "react";
import PDF from "@/components/generatepdf/PDF";
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

function BodyComponent() { 
  const [isClient, setIsClient] = useState(false);
  const { loading, error, data } = useRecord<ExpedienteData>();
  const { loadingStudent, errorStudent, dataStudent } = useStudent<Student>();
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || loading || error || !data) return null; 
  if (!isClient || loadingStudent || errorStudent || !dataStudent) return null;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-no-repeat" />
      <PDF data={data} dataStudent={dataStudent} /> 
    </div>
  );
}

const PDFPage: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center">
      <BodyComponent />
    </main>
  );
};

export default PDFPage;