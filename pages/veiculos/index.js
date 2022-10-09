import Link from "next/link";
import { useEffect, useState } from "react";
import VeiculosService from '../../services/VeiculosService';

const veiculosService = new VeiculosService();

function Veiculos() {
    const [veiculos, setVeiculos] = useState([]);

    useEffect(() => {
        veiculosService.listarVeiculos().then((response) => setVeiculos(response.data))
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);

    return (
        <main>
            {veiculos.map((v, i) => (
                <>
                    <section className="cards" key={i}>
                        <Link href={`/veiculo?id=${v._id}`}>
                        <div className="card">
                            <div className="image">
                                <img src={v.foto} />
                            </div>
                            <div className="content">
                                <h2 className="title">
                                    {v.nome} {v.marca}
                                </h2>
                                <p className="text--medium">{v.modelo}</p>
                                <div className="info">
                                    <p className="price text--medium">{v.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </section>
                </>
            ))}
        </main>
    )
}

export default Veiculos;