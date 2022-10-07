/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import comAutorizacao from '../../hoc/comAutorizacao';
import UsuarioService from '../../services/UsuarioService';
import { validarNome } from '../../utils/validadores';
import Botao from '../../components/botao';
import InputPublico from '../../components/inputPublico';
import AcaoMensagem from "../../components/AcaoMensagem";
import Header from "../../components/layout/header";

const usuarioService = new UsuarioService();

function EditarPerfil({ usuarioLogado }) {
    const [nome, setNome] = useState('');

    useEffect(() => {
        if (!usuarioLogado) {
            return;
        }

        setNome(usuarioLogado.nome);
    }, []);

    const atualizarPerfil = async () => {
        try {
            if (!validarNome(nome)) {
                alert('Nome precisa de pelo menos 2 caracteres!');
                return;
            }

            const corpoRequisicao = new FormData();
            corpoRequisicao.append('nome', nome);

            await usuarioService.atualizarPerfil(corpoRequisicao);
            localStorage.setItem('nome', nome);

        } catch (error) {
            alert(`Erro ao editar perfil!`);
        }
    }

    return (
        <>
            <Header />
        <section className={`paginaPublica`}>
            <div className='conteudoPaginaPublica'>
                <AcaoMensagem classe={'salvar'} mensagem={'Atualizado com sucesso'} />
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
            </div>
        </section>
        </>
    );
}

export default comAutorizacao(EditarPerfil);