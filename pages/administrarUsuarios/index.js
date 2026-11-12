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
            console.error(e);
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
                <section>
                    <ModalVeiculos
                        titulo={"Cadastro de Usuários"}
                        botaoAbrirModal={"Cadastrar Usuário"}
                        conteudo={<CadastroUsuarioAdm />}
                    />
                </section>
                {listaUsuarios.map((dadosUsuarios, index) => (
                        <div className="container-item" key={index}>
                            <div>
                                <p>{dadosUsuarios.nome}</p>
                                <p>{dadosUsuarios.email}</p>
                                <p>{dadosUsuarios.nivelAcesso} </p>
                            </div>
                            <div className="botoesAcoes" onSubmit={atualizaDados}>
                                <section>
                                    <ModalVeiculos
                                        titulo={"Editar Usuário"}
                                        botaoAbrirModal={"Editar"}
                                        conteudo={<EditarUsuarios idUsuario={(dadosUsuarios._id)} />}
                                    />
                                </section>
                                <section>
                                    <ModalVeiculos
                                        titulo={"Deletar Usuário"}
                                        botaoAbrirModal={"Deletar"}
                                        variant="vermelho"
                                        conteudo={<DeletarUsuarios idUsuario={(dadosUsuarios._id)} />}
                                    />
                                </section>
                            </div>
                        </div>
                ))
                }
            </div>
        </>
    )
}

export default comAutorizacao(AdministrarUsuarios);