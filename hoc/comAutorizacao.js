/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import Header from "../components/layout/header";
import UsuarioService from "../services/UsuarioService"

const usuarioService = new UsuarioService();

export default function comAutorizacao(Componente) {
    return (props) => {
        const router = useRouter();

        if (typeof window !== 'undefined') {
            if (!usuarioService.estaAutenticadoAdm()) {
                router.replace('/');
                return null;
            }

            const usuarioLogado = usuarioService.obterInformacoesDoUsuarioLogado();

            return (
                <>
                    <Header usuarioLogado={usuarioLogado} />
                    <Componente usuarioLogado={usuarioLogado} {...props} />
                </>
            );
        }

        return null;
    }
}