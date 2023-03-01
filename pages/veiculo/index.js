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
    }, [id]);

    return (
        <>
            <Header />
            <main>
                <section className={`paginaVeículo`}>
                    <div className="conteudoPaginaVeículo">
                        <picture>
                            <source srcSet={veiculo.foto} type="image/webp" />
                            <img src={veiculo.foto} alt="Foto do carro" />
                        </picture>
                        <h2 className="title">
                            {veiculo.nome} {veiculo.marca}
                        </h2>
                        <p className="text--medium">{veiculo.modelo}</p>
                        <p className="price text--medium">{veiculo.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
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
