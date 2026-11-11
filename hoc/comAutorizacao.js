/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UsuarioService from "../services/UsuarioService"

const usuarioService = new UsuarioService();

// Protege as telas de administração. É só conveniência de navegação: quem
// garante a permissão é a API, que confere o nível de acesso a cada requisição.
export default function comAutorizacao(Componente) {
    return (props) => {
        const router = useRouter();
        const [usuarioLogado, setUsuarioLogado] = useState(null);

        useEffect(() => {
            if (!usuarioService.estaAutenticadoAdm()) {
                router.replace('/');
                return;
            }
            setUsuarioLogado(usuarioService.obterInformacoesDoUsuarioLogado());
        }, [router]);

        // Nada é renderizado até a sessão ser conferida.
        if (!usuarioLogado) {
            return null;
        }

        return <Componente usuarioLogado={usuarioLogado} {...props} />;
    }
}
