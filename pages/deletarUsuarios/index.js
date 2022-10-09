import { useState } from "react";
import Botao from "../../components/botao";
import comAutorizacao from '../../hoc/comAutorizacao';
import UsuarioService from "../../services/UsuarioService";
import AcaoMensagem from "../../components/AcaoMensagem";

const usuarioService = new UsuarioService();

function DeletarUsuarios({ idUsuario }) {
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const [classeAcao, setClasseAcao] = useState("");
    const [mensagemAcao, setMensagemAcao] = useState("");

    const id = idUsuario;

    const deletarUsuario = async (e) => {
        e.preventDefault();

        setEstaSubmetendo(true);
        setClasseAcao('deletar');
        setMensagemAcao('Deletado com sucesso!');

        try {
            await usuarioService.deletarUsuarios(id);

        } catch (error) {
            alert(
                "Erro ao deletar o usuário. " + error?.response?.data?.erro
            );
        }

        setEstaSubmetendo(false);
    }

    return (
        <>
            <div className="inputPublicoContainer">
                <AcaoMensagem classe={classeAcao} mensagem={mensagemAcao} />
                <div className="inputPublicoVeiulos">

                    <p>Deseja realmente deletar o usuário?</p>
                    <form onSubmit={deletarUsuario}>
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

export default comAutorizacao(DeletarUsuarios);