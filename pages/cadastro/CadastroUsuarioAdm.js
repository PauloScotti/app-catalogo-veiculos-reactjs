import Botao from '../../components/botao';
import InputPublico from "../../components/inputPublico";
import { useState } from "react";
import UsuarioService from '../../services/UsuarioService';

import {validarEmail, validarSenha, validarNome, validarConfirmacaoSenha, validarnivelAcesso} from '../../utils/validadores';
import AcaoMensagem from "../../components/AcaoMensagem";

const usuarioService = new UsuarioService();

export default function Cadastro() {

    const [nome, setNome] = useState("");
    const [nivelAcesso, setNivelAcesso] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmaSenha] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);

    
    const validarFormulario = () => {
        return (
            validarNome(nome)
            && validarEmail(email) 
            && validarSenha(senha)
            && validarConfirmacaoSenha(senha, confirmarSenha)
            && validarnivelAcesso(nivelAcesso)
        );
    }

    const aoSubmeter = async (e) => {
        e.preventDefault();
        if(!validarFormulario()){
            return;
        }

        setEstaSubmetendo(true);

        try{
            const corpoReqCadastro = new FormData();
            corpoReqCadastro.append("nome", nome);
            corpoReqCadastro.append("email", email);
            corpoReqCadastro.append("senha", senha);
            corpoReqCadastro.append("nivelAcesso", nivelAcesso);

            await usuarioService.cadastroUsuarios(corpoReqCadastro);
            

        } catch(error){
            alert(
                "Erro ao cadastrar o usuário. " + error?.response?.data?.erro
            );
        }

        setEstaSubmetendo(false);
    }

    return (
        <>
        <AcaoMensagem classe={'salvar'} mensagem={'Salvo com sucesso'} />
        <section className={'paginaCadastro'}>
            <div className="conteudoPaginaPublica conteudoPaginaPublicaCadastro">
                <form onSubmit={aoSubmeter}>
                    
                    <InputPublico
                        texto="Nome Completo"
                        tipo="nome"
                        aoAlterarValor={e => setNome(e.target.value)}
                        valor={nome}
                        mensagemValidacao="O nome precisa ter pelo menos 3 caracteres"
                        exibirMensagemValidacao={nome && !validarNome(nome)}
                    />
                    
                    <InputPublico
                        texto="Nível de Acesso"
                        tipo="nivelAcesso"
                        aoAlterarValor={e => setNivelAcesso(e.target.value)}
                        valor={nivelAcesso}
                        mensagemValidacao="O nivel de acesso precisa ser informado"
                        exibirMensagemValidacao={nivelAcesso && !validarnivelAcesso(nivelAcesso)}
                    />

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
                        mensagemValidacao="A senha precisa ter pelo menos 4 caracteres"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />

                    <InputPublico
                        texto="Confirmar Senha"
                        tipo="password"
                        aoAlterarValor={e => setConfirmaSenha(e.target.value)}
                        valor={confirmarSenha}
                        mensagemValidacao="As senhas precisam ser iguais"
                        exibirMensagemValidacao={confirmarSenha && !validarConfirmacaoSenha(senha, confirmarSenha)}
                    />

                    <Botao
                        texto={"Cadastrar"}
                        tipo="submit"
                        desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>

            </div>
            </section>
            </>
    );
}