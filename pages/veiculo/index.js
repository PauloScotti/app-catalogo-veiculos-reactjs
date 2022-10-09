import { useEffect, useState } from "react";
import VeiculosService from '../../services/VeiculosService';
import { useRouter } from 'next/router'
import Header from '../../components/layout/header';
import Botao from '../../components/botao';

const veiculosService = new VeiculosService();

function Veiculos() {
    const { query } = useRouter()
    const id = query.id;
    const [veiculo, setVeiculo] = useState([]);

    useEffect(() => {
        veiculosService.listarVeiculosPorId(id).then((response) => setVeiculo(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);

    return (
        <>
            <Header />
            <main>
                <section className={`paginaVeículo`}>
                    <div className="conteudoPaginaVeículo">
                        <img src={veiculo.foto} alt="Foto do carro" />
                        <h2 className="title">
                            {veiculo.nome} {veiculo.marca}
                        </h2>
                        <p className="text--medium">{veiculo.modelo}</p>
                        <p className="price text--medium">{veiculo.valor}</p>
                        <Botao
                            texto={"Comprar"}
                            tipo="submit"
                        />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Veiculos;