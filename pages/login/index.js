import InputPublico from "../../components/inputPublico";
import Botao from '../../components/botao';
import Link from "next/link";
import { useState } from "react";
import {validarEmail, validarSenha} from '../../utils/validadores';
import UsuarioService from "../../services/UsuarioService";
import { useRouter } from 'next/router';

const usuarioService = new UsuarioService();

export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const router = useRouter();

    const validarFormulario = () => {
        return (
            validarEmail(email) 
            && validarSenha(senha)
        )
    }

    const aoSubmeter = async (e) => {
        e.preventDefault();
        if(!validarFormulario()){
            return;
        }
        setEstaSubmetendo(true);

        try{

            await usuarioService.login({
                login: email,
                senha
            });

            router.push('/');

            
        } catch(error){
            alert(
                "Erro ao realizar o login. " + error?.response?.data?.erro
                );
            }
            
        setEstaSubmetendo(false);
    }

    return (
        <section className={'paginaPublica'}>
            
            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    <InputPublico
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={e => setEmail(e.target.value)}
                        valor={email}
                        mensagemValidacao="O e-mail informado é inválido"
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />

                    <InputPublico
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={e => setSenha(e.target.value)}
                        valor={senha}
                        mensagemValidacao="Precisa ter pelo menos 4 caracteres"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />

                    <Botao
                        texto={"Login"}
                        tipo="submit"
                        desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>

                <div className="rodapePaginaPublica">
                    <p>Não possui uma conta?</p>
                    <Link href="/cadastro">Faça seu cadastro agora</Link>
                </div>

            </div>
        </section>
    )
}