/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import comAutorizacao from '../../hoc/comAutorizacao';
import UsuarioService from '../../services/UsuarioService';
import { validarNome } from '../../utils/validadores';
import Botao from '../../components/botao';
import InputPublico from '../../components/inputPublico';
import AcaoMensagem from "../../components/AcaoMensagem";
import Header from "../../components/layout/header";
import { useRouter } from 'next/router';

const usuarioService = new UsuarioService();

function EditarPerfil({ usuarioLogado }) {
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const [classeAcao, setClasseAcao] = useState("");
    const [mensagemAcao, setMensagemAcao] = useState("");
    const [nome, setNome] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (!usuarioLogado) {
            return;
        }

        setNome(usuarioLogado.nome);
    }, [usuarioLogado]);

    const atualizarPerfil = async () => {
        try {
            if (!validarNome(nome)) {
                alert('Nome precisa de pelo menos 2 caracteres!');
                return;
            }

            
            setEstaSubmetendo(true);
            setClasseAcao('salvar');
            setMensagemAcao('Atualizado com sucesso!');

            const corpoRequisicao = new FormData();
            corpoRequisicao.append('nome', nome);

            await usuarioService.atualizarPerfil(corpoRequisicao);
            localStorage.setItem('nome', nome);

        } catch (error) {
            alert(`Erro ao editar perfil!`);
        }

        setEstaSubmetendo(false);
    }

    const deletarPerfil = async (idUsuario) => {
        setEstaSubmetendo(true);
        setClasseAcao('deletar');
        setMensagemAcao('Deletado com sucesso!');

        try {
            await usuarioService.deletarUsuarios(idUsuario);
            await usuarioService.logout();
            router.replace('/');
            return null;

        } catch (error) {
            alert(
                "Erro ao deletar o usuário. " + error?.response?.data?.erro
            );
        }

        setEstaSubmetendo(false);
    }

    return (
        <>
            <Header />
            <section className={`paginaPublica`}>
                <div className='conteudoPaginaPublica'>
                    <AcaoMensagem classe={classeAcao} mensagem={mensagemAcao} />
                    <div className='edicaoNome'>
                        <InputPublico
                            texto={nome}
                            tipo="text"
                            aoAlterarValor={e => setNome(e.target.value)}
                            valor={nome}
                        />
                    </div>
                    <Botao
                        texto="Salvar alteração"
                        tipo="button"
                        manipularClique={() => atualizarPerfil()}
                    />
                    <Botao
                        texto="Deletar conta"
                        tipo="button"
                        cor='vermelho'
                        manipularClique={() => deletarPerfil(usuarioLogado.id)}
                    />
                </div>
            </section>
        </>
    );
}

export default comAutorizacao(EditarPerfil);