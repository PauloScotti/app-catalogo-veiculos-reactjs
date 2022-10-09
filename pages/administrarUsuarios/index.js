/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import UsuariosService from "../../services/UsuarioService";
import comAutorizacao from "../../hoc/comAutorizacao";
import ModalVeiculos from '../../components/modais';
import CadastroUsuarioAdm from "../cadastro/CadastroUsuarioAdm";
import Header from '../../components/layout/header';

import EditarUsuarios from "../editarUsuarios";
import DeletarUsuarios from "../deletarUsuarios";

const usuariosService = new UsuariosService();

function AdministrarUsuarios() {
    const [listaUsuarios, setListaUsuarios] = useState([]);

    const listandoUsuarios = async () => {
        try {
            const resultado = await usuariosService.listarUsuarios();
            setListaUsuarios(resultado.data);
        } catch (e) {
            console.log(e);
        }
    }

    const atualizaDados = () => {
        listandoUsuarios();
    }

    useEffect(() => {
        listandoUsuarios()
    }, []);

    return (
        <>
            <Header />
            <div className="container-listagem" onSubmit={atualizaDados}>
                <div onSubmit={atualizaDados}>
                    <ModalVeiculos
                        titulo={"Cadastro de Usuários"}
                        botaoAbrirModal={"Cadastrar Usuário"}
                        conteudo={<CadastroUsuarioAdm />}
                    />
                </div>
                {listaUsuarios.map((dadosUsuarios, index) => (
                    <>
                        <div className="container-item">
                            <div>
                                <p key={index}>{dadosUsuarios.nome}</p>
                                <p>{dadosUsuarios.email}</p>
                                <p>{dadosUsuarios.nivelAcesso} </p>
                            </div>
                            <div className="botoesAcoes" onSubmit={atualizaDados}>
                                <ModalVeiculos
                                    titulo={"Editar Usuário"}
                                    botaoAbrirModal={"Editar"}
                                    conteudo={<EditarUsuarios idUsuario={(dadosUsuarios._id)} />}
                                />
                                <ModalVeiculos
                                    titulo={"Deletar Usuário"}
                                    botaoAbrirModal={"Deletar"}
                                    variant="danger"
                                    conteudo={<DeletarUsuarios idUsuario={(dadosUsuarios._id)} />}
                                />
                            </div>
                        </div>
                    </>
                ))
                }
            </div>
        </>
    )
}

export default comAutorizacao(AdministrarUsuarios);