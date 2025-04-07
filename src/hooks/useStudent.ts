import { useState } from "react";

const useStudent = <T>() => {
  const [loadingStudent, setLoadingStudent] = useState<boolean>(false);
  const [errorStudent, setErrorStudent] = useState<string>("");
  const [dataStudent, setDataStudent] = useState<T | null>(null);

  const fetchStudentInfo = async (expediente: string) => {
    if (!expediente.trim()) return;

    setLoadingStudent(true);
    setErrorStudent("");
    setDataStudent(null);

    try {
      const response = await fetch(`api/qr-image/${expediente}`);

      if (!response.ok) {
        throw new Error(response.statusText || "Error al buscar expediente");
      }

      const result: T = await response.json();
      setDataStudent(result);
    } catch (err) {
        setErrorStudent(err instanceof Error ? err.message : "Error desconocido");
    } finally {
        setLoadingStudent(false);
    }
  };

  return { fetchStudentInfo, loadingStudent, errorStudent, dataStudent };
};

export default useStudent;
