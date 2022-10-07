import { useState, useEffect } from "react";
import VeiculosService from "../../services/VeiculosService";
import comAutorizacao from "../../hoc/comAutorizacao";
import ModalVeiculos from '../../components/modais';
import CadastroUsuarioAdm from "../cadastro/CadastroUsuarioAdm";
import CadastroVeiculos from '../cadastroVeiulos';
import Image from "next/image";

import Header from "../../components/layout/header";
import EditarVeiulos from "../editarVeiulos";

const veiculosService = new VeiculosService();

function Administrar() {
    const [listaVeiculos, setListaVeiculos] = useState([]);

    const listandoVeiculos = async () => {
        try{
            const resultado = await veiculosService.listarVeiculos();
            setListaVeiculos(resultado.data);
        } catch (e) {
            console.log(e);
        }
    }

    const atualizaDados = () => {
        listandoVeiculos()
    }

    useEffect(() => {
        listandoVeiculos()
    }, []);

    return (
        <>
            <div className="container-listagem" onSubmit={atualizaDados}>
                <div>
                    <ModalVeiculos
                        titulo={"Cadastro de Veículos"}
                        botaoAbrirModal={"Cadastrar Veículo"}
                        conteudo={<CadastroVeiculos />}
                    />
                    <ModalVeiculos
                        titulo={"Cadastro de Usuários"}
                        botaoAbrirModal={"Cadastrar Usuário"}
                        conteudo={<CadastroUsuarioAdm /> }
                    />
                </div>
                {listaVeiculos.map((dadosVeiculos) => (
                    <>
                        <div className="container-item" onSubmit={atualizaDados}>
                            <div>
                                <p>{dadosVeiculos.nome}</p>
                                <p>{dadosVeiculos.marca}</p>
                                <p>Modelo: {dadosVeiculos.modelo} </p>
                                <p>Valor: {dadosVeiculos.valor} </p>
                            </div>
                            <div className="botoesAcoes" onSubmit={atualizaDados}>
                                <ModalVeiculos
                                    titulo={"Editar Módulo"}
                                    botaoAbrirModal={"Editar"}
                                    conteudo={<EditarVeiulos idVeiculo={(dadosVeiculos._id)}/>}
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

export default comAutorizacao(Administrar);