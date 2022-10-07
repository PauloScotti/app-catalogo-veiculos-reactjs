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
            {veiculos.map(v => (
                <>
                    <section class="cards">
                        <div class="card">
                            <div class="image">
                                <img src={v.foto} />
                            </div>
                            <div class="content">
                                <h2 class="title">
                                    {v.nome} {v.marca}
                                </h2>
                                <p class="text--medium">{v.modelo}</p>
                                <div class="info">
                                    <p class="price text--medium">R$ { parseFloat(v.valor) }</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            ))}
        </main>
    )
}

export default Veiculos;