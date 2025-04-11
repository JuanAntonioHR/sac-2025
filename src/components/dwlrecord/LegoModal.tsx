import React, { useState } from "react";
import Image from "next/image";
import useRecord from "@/hooks/useRecord";
import DownloadPdfButton from "./DownloadPdfButton";

const LegoModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expediente, setExpediente] = useState("");
  const { fetchExpediente, loading, error, data } = useRecord();

  const handleSearch = async () => {
    await fetchExpediente(expediente);
  };

  React.useEffect(() => {
    if (data) {
      const existingExpediente = localStorage.getItem("expedienteCode");
      if (existingExpediente) {
        localStorage.removeItem("expedienteCode");
      }      
      localStorage.setItem("expedienteCode", expediente);
      setIsOpen(true);
    }
  }, [data]);

  const closeModal = () => {
    setIsOpen(false);
    setExpediente("");
  };

  return (
    <div className="flex flex-col justify-center items-center w-full mt-5 lg:mt-15">
      {!loading ? (
        <>      
        <input
            type="number"
            value={expediente}
            onChange={(e) => setExpediente(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Ingresa tu expediente..."
            className="border-1 border-gray-700 rounded-3xl p-2 w-full focus:outline-none text-lg md:text-xl placeholder-gray-400"
          />
          {error && <p style={{color: '#DC2626'}} className="mt-2 lg:mt-5 text-md lg:text-sm">{error}</p>}
        </>
      ) : (
        <Image
          src="/cubo.svg"
          alt="Lego Loader"
          width={70}
          height={70}
          className="animate-pulse mb-20"
        />
      )}

      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex justify-center items-center z-50 overflow-hidden">
          <div className="rounded-3xl relative min-h-[600px] min-w-[300px] bg-gradient-to-r from-[#F87171] from-50% to-[#FFFFFF] to-50% overflow-hidden sm:min-h-[300px] sm:min-w-[500px] md:min-h-[400px] md:min-w-[700px]">
            
            <div className="w-[140px] h-[140px] absolute top-24 left-0 z-20 ml-[2px] sm:top-0 sm:p-2 md:p-0 md:w-fit md:h-fit md:mt-[30px] md:ml-[10px]">
              <Image src="/TextBubbleModal.svg" alt="Text Bubble" width={140} height={140} />
            </div>

            <div className="sm:hidden w-full h-fit absolute left-1/2 -translate-x-1/2 bottom-0 rotate-270 mb-[86px]">
              <svg width="" height="161" viewBox="0 0 33 161">
                <g clipPath="url(#clip0_148_1669)">
                  <path d="M32.5 69.5L32.5 23.5L16.5 23.5L16.5 69.5H32.5Z" fill="#FCD34D" />
                  <path d="M32.5 137.5L32.5 91.5H16.5L16.5 137.5H32.5Z" fill="#FCD34D" />
                  <path d="M16.5 161L16.5 0L-52.5 0L-52.5 161L16.5 161Z" fill="#FCD34D" />
                </g>
                <defs>
                  <clipPath id="clip0_148_1669">
                    <rect width="161" height="85" fill="#FFFFFF" transform="matrix(0 1 -1 0 32.5 0)" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div className="hidden sm:block w-full h-fit absolute left-1/2 -translate-x-1/2 top-0 ml-[15px]">
              <svg width="" height="161" viewBox="0 0 33 161">
                <g clipPath="url(#clip0_148_1669)">
                  <path d="M32.5 69.5L32.5 23.5L16.5 23.5L16.5 69.5H32.5Z" fill="#F87171" />
                  <path d="M32.5 137.5L32.5 91.5H16.5L16.5 137.5H32.5Z" fill="#F87171" />
                  <path d="M16.5 161L16.5 0L-52.5 0L-52.5 161L16.5 161Z" fill="#F87171" />
                </g>
                <defs>
                  <clipPath id="clip0_148_1669">
                    <rect width="161" height="85" fill="#FFFFFF" transform="matrix(0 1 -1 0 32.5 0)" />
                  </clipPath>
                </defs>
              </svg>
            </div>

            <div className="w-[140px] h-fit absolute left-1/2 -translate-x-1/2 bottom-24 mb-[86px] sm:bottom-0 sm:mb-[3px] sm:absolute sm:left-40 md:w-[160px] md:h-fit md:left-50">
              <Image src="/ModalLego.svg" alt="Lego Modal" width={140} height={140} />
            </div>

            <div className="w-full h-fit absolute bottom-0 mb-[18px] right-0 sm:w-fit sm:h-fit sm:right-8 sm:mt-[20px] sm:top-1/2 sm:-translate-y-1/2 sm:mb-[0px]">
              <DownloadPdfButton />
            </div>

            <div className="w-fit h-fit absolute top-6 right-6">
              <span
                style={{color: '#000000'}}
                className="text-2xl font-bold cursor-pointer hover:text-[#DC2626]"
                onClick={closeModal}
              >
                ✕
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LegoModal;
