"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import Alert from "@/components/card-generator/Alert";

const DynamicLego = dynamic(() => import("@/components/qrsearch/LegoInput"), {
  ssr: false,
});

export default function Page() {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const codeHandler = (code: string) => {
    if (code.length !== 6) return;
    setIsLoading(true);

    // Fetch the student data
    fetch(`/api/qr-image/${code}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          Swal.fire({
            icon: "warning",
            title: code,
            text: "¿Estás seguro que éste es tu expediente?",
            showCancelButton: true,
            confirmButtonText: "Sí, registrar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.setItem("expedienteCode", code); // Guardar en localStorage
              setIsLoading(true);
              router.push(`/charactereditor/${code}`);
            }
          });
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
        Swal.fire({
          icon: "info",
          title: "Expediente encontrado",
          text: "¿Deseas visualizar tu tarjeta o editar tu personaje?",
          showCancelButton: true,
          confirmButtonText: "Visualizar",
          cancelButtonText: "Editar",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push(data.url_image);
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            localStorage.setItem("expedienteCode", code); 
            router.push(`/charactereditor/${code}`);
          }
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error de conexión",
          text: "Por favor, intenta de nuevo",
          confirmButtonText: "Entendido",
        });
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full h-full relative bg-linear-180 from-white to-sky-400">
      <Alert text="No olvides registrar tu tarjeta una vez que la personalizes. Te permitirá acceder a tu hoja de asistencias" />
      <div className="w-full h-[92dvh] flex items-center justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            codeHandler(code);
          }}
          className="p-8 gap-4 flex flex-col items-center justify-center rounded-2xl bg-whitesac"
        >
          <h1 className="text-2xl font-bold text-blacksac">¿Cuál es tu expediente?</h1>
          <DynamicLego value={code} onChange={setCode} maxLength={6} />
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className={`w-full md:w-fit bg-blue-400 py-2 px-6 font-bold text-lg text-white rounded-2xl transition-all flex items-center justify-center
                ${
                  code.length === 6 && !isLoading
                    ? "cursor-pointer hover:scale-105"
                    : "cursor-not-allowed opacity-50"
                }`}
              disabled={code.length !== 6 || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="loader"></span> Cargando...
                </div>
              ) : (
                "Buscar"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
