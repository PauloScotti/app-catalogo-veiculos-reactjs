import { useState } from "react";
import Botao from "../../components/botao";
import comAutorizacao from '../../hoc/comAutorizacao';
import VeiculosService from "../../services/VeiculosService";
import AcaoMensagem from "../../components/AcaoMensagem";

const veiculoService = new VeiculosService();

function DeletarVeiculos({ idVeiculo }) {
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const [classeAcao, setClasseAcao] = useState("");
    const [mensagemAcao, setMensagemAcao] = useState("");

    const id = idVeiculo;

    const deletarVeiulo = async (e) => {
        e.preventDefault();

        setEstaSubmetendo(true);
        setClasseAcao('deletar');
        setMensagemAcao('Deletado com sucesso!');

        try {
            await veiculoService.deletarVeiculos(id);

        } catch (error) {
            alert(
                "Erro ao deletar o veículo. " + error?.response?.data?.erro
            );
        }

        setEstaSubmetendo(false);
    }

    return (
        <>
            <div className="inputPublicoContainer">
                <AcaoMensagem classe={classeAcao} mensagem={mensagemAcao} />
                <div className="inputPublicoVeiulos">

                    <form onSubmit={deletarVeiulo}>
                        <p>Deseja realmente deletar o veículo?</p>
                    <Botao
                        texto={"Confirmar"}
                        cor="vermelho"
                        tipo="submit"
                        desabilitado={estaSubmetendo}
                    />
                    </form>
                </div>
            </div>
        </>
    )
}

export default comAutorizacao(DeletarVeiculos);