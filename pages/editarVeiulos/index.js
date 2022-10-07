import { useEffect, useState } from "react";
import Botao from "../../components/botao";
import InputPublico from "../../components/inputPublico";
import UploadImagem from "../../components/uploadImagem";
import comAutorizacao from '../../hoc/comAutorizacao';
import VeiculosService from "../../services/VeiculosService";
import { validaNomeVeiculo, validaMarca, validaModelo, validaValor, validaFoto } from "../../utils/validadores";
import AcaoMensagem from "../../components/AcaoMensagem";

import iconeImagem from '../../public/imagens/foto.png';

const veiculoService = new VeiculosService();

function EditarVeiculos({ idVeiculo }) {

    const [nome, setNome] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [valor, setValor] = useState("");
    const [foto, setFoto] = useState("");
    const [inputFoto, setInputFoto] = useState();
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const [listaVeiculo, setListaVeiculo] = useState([]);
    const [classeAcao, setClasseAcao] = useState("");
    const [mensagemAcao, setMensagemAcao] = useState("");

    const id = idVeiculo;

    useEffect(() => {
        veiculoService.listarVeiculosPorId(id).then((response) => setListaVeiculo(response.data));
        setNome(listaVeiculo.nome);
        setMarca(listaVeiculo.marca);
        setModelo(listaVeiculo.modelo);
        setValor(listaVeiculo.valor);
        setFoto({
            preview: listaVeiculo.foto
        });
    }, [id, listaVeiculo.foto, listaVeiculo.marca, listaVeiculo.modelo, listaVeiculo.nome, listaVeiculo.valor]);

    const validarFormulario = () => {
        return (
            validaNomeVeiculo(nome)
            && validaMarca(marca)
            && validaModelo(modelo)
            && validaValor(valor)
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
            const corpoRequisicao = new FormData();
            corpoRequisicao.append('nome', nome);
            corpoRequisicao.append('marca', marca);
            corpoRequisicao.append('modelo', modelo);
            corpoRequisicao.append('valor', valor);
            corpoRequisicao.append('file', foto.arquivo);

            await veiculoService.editarVeiculos(id, corpoRequisicao);

        } catch (error) {
            alert(
                "Erro ao editar o veículo. " + error?.response?.data?.erro
            );
        }

        setEstaSubmetendo(false);
    }

    const deletarVeiulo = async (idVeiculo) => {

        setEstaSubmetendo(true);
        setClasseAcao('deletar');
        setMensagemAcao('Deletado com sucesso!');

        try {
            await veiculoService.deletarVeiculos(idVeiculo);

        } catch (error) {
            alert(
                "Erro ao deletar o veículo. " + error?.response?.data?.erro
            );
        }

        setEstaSubmetendo(false);
    }

    
    const abrirSeletorDeArquivos = () => {
        inputFoto?.click();
    }

    return (
        <>
            <div className="inputPublicoContainer">
                <AcaoMensagem classe={classeAcao} mensagem={mensagemAcao} />
                <div className="inputPublicoVeiulos">

                    <form onSubmit={aoSubmeter}>
                        <div className='edicaoFotoVeiculo'>
                            <UploadImagem
                                setImagem={setFoto}
                                imagemPreview={foto?.preview || iconeImagem.src}
                                imagemPreviewClassName='fotoVeiculo'
                                aoSetarAReferencia={setInputFoto}
                            />

                            <span onClick={abrirSeletorDeArquivos}>Alterar foto do veículo</span>
                        </div>

                        <InputPublico
                            texto="Nome do Veículo"
                            tipo="text"
                            aoAlterarValor={e => setNome(e.target.value)}
                            valor={nome}
                            mensagemValidacao="O nome do veículo precisa ter pelo menos 2 caracteres"
                            exibirMensagemValidacao={nome && !validaNomeVeiculo(nome)}
                        />

                        <InputPublico
                            texto="Marca"
                            tipo="text"
                            aoAlterarValor={e => setMarca(e.target.value)}
                            valor={marca}
                            mensagemValidacao="A marca do veículo precisa ter pelo menos 3 caracteres"
                            exibirMensagemValidacao={marca && !validaMarca(marca)}
                        />

                        <InputPublico
                            texto="Modelo"
                            tipo="text"
                            aoAlterarValor={e => setModelo(e.target.value)}
                            valor={modelo}
                            mensagemValidacao="A modelo do veículo precisa ter pelo menos 3 caracteres"
                            exibirMensagemValidacao={modelo && !validaModelo(modelo)}
                        />

                        <InputPublico
                            texto="Valor"
                            tipo="text"
                            aoAlterarValor={e => setValor(e.target.value)}
                            valor={valor}
                            mensagemValidacao="O valor do veículo precisa ter pelo menos 4 digitos"
                            exibirMensagemValidacao={valor && !validaValor(valor)}
                        />

                        <Botao
                            texto={"Salvar alterações"}
                            tipo="submit"
                            desabilitado={!validarFormulario() || estaSubmetendo}
                        />
                    </form>
                    <Botao
                        texto={"Deletar veículo?"}
                        cor="vermelho"
                        tipo="submit"
                        manipularClique={() => deletarVeiulo(id)}
                        desabilitado={estaSubmetendo}
                    />
                </div>
            </div>
        </>
    )
}

export default comAutorizacao(EditarVeiculos);