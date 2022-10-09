/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import VeiculosService from "../../services/VeiculosService";
import comAutorizacao from "../../hoc/comAutorizacao";
import ModalVeiculos from '../../components/modais';
import CadastroUsuarioAdm from "../cadastro/CadastroUsuarioAdm";
import CadastroVeiculos from '../cadastroVeiulos';
import Header from '../../components/layout/header';

import EditarVeiulos from "../editarVeiulos";
import DeletarVeiculos from "../deletarVeiculos";

const veiculosService = new VeiculosService();

function Administrar() {
    const [listaVeiculos, setListaVeiculos] = useState([]);

    const listandoVeiculos = async () => {
        try {
            const resultado = await veiculosService.listarVeiculos();
            setListaVeiculos(resultado.data);
            console.log('chamou')
        } catch (e) {
            console.log(e);
        }
    }

    const atualizaDados = () => {
        listandoVeiculos();
    }

    useEffect(() => {
        listandoVeiculos()
    }, []);

    return (
        <>
            <Header />
            <div className="container-listagem" onSubmit={atualizaDados}>
                <div onSubmit={atualizaDados}>
                    <ModalVeiculos
                        titulo={"Cadastro de Veículos"}
                        botaoAbrirModal={"Cadastrar Veículo"}
                        conteudo={<CadastroVeiculos />}
                    />
                    <ModalVeiculos
                        titulo={"Cadastro de Usuários"}
                        botaoAbrirModal={"Cadastrar Usuário"}
                        conteudo={<CadastroUsuarioAdm />}
                    />
                </div>
                {listaVeiculos.map((dadosVeiculos, index) => (
                    <>
                        <div className="container-item">
                            <div>
                                <p key={index}>{dadosVeiculos.nome}</p>
                                <p>{dadosVeiculos.marca}</p>
                                <p>Modelo: {dadosVeiculos.modelo} </p>
                                <p>Valor: {dadosVeiculos.valor} </p>
                                <img src={dadosVeiculos.foto} alt="Foto do carro" />
                            </div>
                            <div className="botoesAcoes" onSubmit={atualizaDados}>
                                <ModalVeiculos
                                    titulo={"Editar Veículo"}
                                    botaoAbrirModal={"Editar"}
                                    conteudo={<EditarVeiulos idVeiculo={(dadosVeiculos._id)} />}
                                />
                                <ModalVeiculos
                                    titulo={"Deletar Veículo"}
                                    botaoAbrirModal={"Deletar"}
                                    variant="danger"
                                    conteudo={<DeletarVeiculos idVeiculo={(dadosVeiculos._id)} />}
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