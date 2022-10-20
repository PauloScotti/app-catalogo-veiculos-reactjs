/* eslint-disable react/display-name */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UsuarioService from "../services/UsuarioService"

const usuarioService = new UsuarioService();

export default function comAutorizacao(Componente) {
    return (props) => {
        const router = useRouter();
        const hasWindow = typeof window !== 'undefined';
        const [usuarioLogado, setUsuarioLogado] = useState('');

        useEffect(() => {
            if (hasWindow) {
                if (!usuarioService.estaAutenticadoAdm()) {
                    router.replace('/');
                    return null;
                }
    
                setUsuarioLogado(usuarioService.obterInformacoesDoUsuarioLogado());
            }
          }, [hasWindow, router]);

            

            return (
                <>
                    <Componente usuarioLogado={usuarioLogado} {...props} />
                </>
            );

        return null;
    }
}