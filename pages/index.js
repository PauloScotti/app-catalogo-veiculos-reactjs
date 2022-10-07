import { useState, useEffect } from "react";
import Home from "../components/home";
import UsuarioService from "../services/UsuarioService";

const usuarioService = new UsuarioService();

export default function Index() {

  const [estaAutenticado, setEstaAutenticado] = useState(false);
  const token = useState('token', 'tokenAdm');

  useEffect(() => {
    setEstaAutenticado(
      usuarioService.estaAutenticadoAdm()
    );
  }, [token]);

  if (estaAutenticado === null) {
    return <Home />;
  }

  if (estaAutenticado) {
    return <Home />;
  }

}
