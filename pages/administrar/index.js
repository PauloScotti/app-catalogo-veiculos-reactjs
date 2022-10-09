/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import VeiculosService from "../../services/VeiculosService";
import comAutorizacao from "../../hoc/comAutorizacao";
import ModalVeiculos from '../../components/modais';
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
                </div>
                {listaVeiculos.map((dadosVeiculos, index) => (
                    <>
                        <div className="container-item">
                            <div>
                                <p key={index}>Nome: {dadosVeiculos.nome}</p>
                                <p>Marca: {dadosVeiculos.marca}</p>
                                <p>Modelo: {dadosVeiculos.modelo} </p>
                                <p>Valor: {dadosVeiculos.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p>
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