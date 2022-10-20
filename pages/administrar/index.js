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
                <section>
                    <ModalVeiculos
                        titulo={"Cadastro de Veículos"}
                        botaoAbrirModal={"Cadastrar Veículo"}
                        conteudo={<CadastroVeiculos />}
                    />
                </section>
                {listaVeiculos.map((dadosVeiculos, index) => (

                    <div className="container-item" key={index}>
                        <div>
                            <p>Nome: {dadosVeiculos.nome}</p>
                            <p>Marca: {dadosVeiculos.marca}</p>
                            <p>Modelo: {dadosVeiculos.modelo} </p>
                            <p>Valor: {dadosVeiculos.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} </p>

                            <picture>
                                <source srcSet={dadosVeiculos.foto} type="image/webp" />
                                <img src={dadosVeiculos.foto} alt="Foto do carro" />
                            </picture>
                        </div>
                        <div className="botoesAcoes" onSubmit={atualizaDados}>
                            <section>
                                <ModalVeiculos
                                    titulo={"Editar Veículo"}
                                    botaoAbrirModal={"Editar"}
                                    conteudo={<EditarVeiulos idVeiculo={(dadosVeiculos._id)} />}
                                />
                            </section>
                            <section>
                                <ModalVeiculos
                                    titulo={"Deletar Veículo"}
                                    botaoAbrirModal={"Deletar"}
                                    variant="vermelho"
                                    conteudo={<DeletarVeiculos idVeiculo={(dadosVeiculos._id)} />}
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

export default comAutorizacao(Administrar);