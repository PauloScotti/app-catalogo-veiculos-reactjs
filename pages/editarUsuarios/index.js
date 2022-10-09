import { useEffect, useState } from "react";
import Botao from "../../components/botao";
import InputPublico from "../../components/inputPublico";
import comAutorizacao from '../../hoc/comAutorizacao';
import UsuarioService from "../../services/UsuarioService";
import { validarNome, validarnivelAcesso } from "../../utils/validadores";
import AcaoMensagem from "../../components/AcaoMensagem";

const usuarioService = new UsuarioService();

function EditarVeiculos({ idUsuario }) {

    const [nome, setNome] = useState("");
    const [nivelAcesso, setNivelAcesso] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const [classeAcao, setClasseAcao] = useState("");
    const [mensagemAcao, setMensagemAcao] = useState("");
    const [listaUsuario, setListaUsuario] = useState([]);

    const id = idUsuario;

    
    useEffect(() => {
        usuarioService.listarUsuariosPorId(id).then((response) => setListaUsuario(response.data));
        setNome(listaUsuario.nome);
        setNivelAcesso(listaUsuario.nivelAcesso);
    }, [id, listaUsuario.nivelAcesso, listaUsuario.nome]);

    const validarFormulario = () => {
        return (
            validarNome(nome)
            && validarnivelAcesso(nivelAcesso)
        );
    }

    const aoSubmeter = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) {
            return;
        }

        setEstaSubmetendo(true);
        setClasseAcao('salvar');
        setMensagemAcao('Atualizado com sucesso!');

        try {
            const dadosUsuario = ({
                nome: nome,
                nivelAcesso: nivelAcesso
            });
            
            await usuarioService.editarUsuarios(id, dadosUsuario);

        } catch (error) {
            alert(
                "Erro ao editar o usuário. " + error?.response?.data?.erro
            );
        }

        setEstaSubmetendo(false);
    }

    return (
        <>
            <div className="inputPublicoContainer">
                <AcaoMensagem classe={classeAcao} mensagem={mensagemAcao} />
                <div className="inputPublicoVeiulos">

                    <form onSubmit={aoSubmeter}>

                        <InputPublico
                            texto="Nome do Usuário"
                            tipo="text"
                            aoAlterarValor={e => setNome(e.target.value)}
                            valor={nome}
                            mensagemValidacao="O nome do usuário precisa ter pelo menos 2 caracteres"
                            exibirMensagemValidacao={nome && !validarNome(nome)}
                        />

                        <InputPublico
                            texto="Nível de Acesso"
                            tipo="text"
                            aoAlterarValor={e => setNivelAcesso(e.target.value)}
                            valor={nivelAcesso}
                            mensagemValidacao="O nivel de acesso precisa ser informado"
                            exibirMensagemValidacao={nivelAcesso && !validarnivelAcesso(nivelAcesso)}
                        />

                        <Botao
                            texto={"Salvar alterações"}
                            tipo="submit"
                            desabilitado={!validarFormulario() || estaSubmetendo}
                        />
                    </form>
                </div>
            </div>
        </>
    )
}

export default comAutorizacao(EditarVeiculos);