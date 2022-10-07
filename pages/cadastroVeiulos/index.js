import { useState } from "react";
import Botao from "../../components/botao";
import InputPublico from "../../components/inputPublico";
import UploadImagem from "../../components/uploadImagem";
import comAutorizacao from '../../hoc/comAutorizacao';
import VeiculosService from "../../services/VeiculosService";
import { validaNomeVeiculo, validaMarca, validaModelo, validaValor, validaFoto } from "../../utils/validadores";
import AcaoMensagem from "../../components/AcaoMensagem";

const veiculoService = new VeiculosService();

function CadastroVeiculos() {

    const [nomeVeiculo, setNomeVeiculo] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [valor, setValor] = useState("");
    const [foto, setFoto] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const [mensagemAcao, setMensagemAcao] = useState("");

    const validarFormulario = () => {
        return (
            validaNomeVeiculo(nomeVeiculo)
            && validaMarca(marca)
            && validaModelo(modelo)
            && validaValor(valor)
            && validaFoto(foto)
        );
    }

    const aoSubmeter = async (e) => {
        e.preventDefault();
        if(!validarFormulario()){
            return;
        }

        setEstaSubmetendo(true);
        setMensagemAcao('Cadastrado com sucesso');

        try{
            const corpoReqCadastro = new FormData();
            corpoReqCadastro.append("nome", nomeVeiculo);
            corpoReqCadastro.append("marca", marca);
            corpoReqCadastro.append("modelo", modelo);
            corpoReqCadastro.append("valor", valor);
            corpoReqCadastro.append('file', foto.arquivo);

            await veiculoService.cadastrarVeiculos(corpoReqCadastro);

            setNomeVeiculo('');
            setMarca('');
            setModelo('');
            setValor('');
            setFoto('');

        } catch(error){
            alert(
                "Erro ao cadastrar o módulo. " + error?.response?.data?.erro
            );
        }

        setEstaSubmetendo(false);
    }


    return (
        <>
            <AcaoMensagem classe={'salvar'} mensagem={mensagemAcao} />
            <div className="inputPublicoModulos">

                <form onSubmit={aoSubmeter}>
                    <UploadImagem
                        imagemPreviewClassName="avatar avatarPreview"
                        imagemPreview={foto?.preview || foto?.src}
                        setImagem={setFoto}
                        mensagemValidacao="A foto do veículo precisa ser inserida"
                        exibirMensagemValidacao={foto && !validaFoto(foto)}
                    />
                    
                    <InputPublico
                        texto="Nome do Veículo"
                        tipo="text"
                        aoAlterarValor={e => setNomeVeiculo(e.target.value)}
                        valor={nomeVeiculo}
                        mensagemValidacao="O nome do veículo precisa ter pelo menos 2 caracteres"
                        exibirMensagemValidacao={nomeVeiculo && !validarNome(nomeVeiculo)}
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
                        texto={"Cadastrar"}
                        tipo="submit"
                        desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>
        </div>
        </>
    )
}

export default comAutorizacao(CadastroVeiculos);