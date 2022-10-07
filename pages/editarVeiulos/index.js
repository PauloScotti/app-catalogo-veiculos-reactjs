import { useEffect, useState } from "react";
import Botao from "../../components/botao";
import InputPublico from "../../components/inputPublico";
import UploadImagem from "../../components/uploadImagem";
import comAutorizacao from '../../hoc/comAutorizacao';
import VeiculosService from "../../services/VeiculosService";
import { validaNomeVeiculo, validaMarca, validaModelo, validaValor, validaFoto } from "../../utils/validadores";
import AcaoMensagem from "../../components/AcaoMensagem";

const veiculoService = new VeiculosService();

function EditarVeiculos({ idVeiculoTeste }) {

    const [nomeVeiculo, setNomeVeiculo] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [valor, setValor] = useState("");
    const [foto, setFoto] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);
    const [listaVeiculo, setListaVeiculo] = useState([]);
    const [classeAcao, setClasseAcao] = useState("");
    const [mensagemAcao, setMensagemAcao] = useState("");
    
    const id = idVeiculoTeste;
    
    useEffect(() => {
        veiculoService.listarVeiculosPorId(id).then((response) => setListaVeiculo(response.data));
        setNomeVeiculo(listaVeiculo.nomeVeiculo);
        setMarca(listaVeiculo.marca);
        setModelo(listaVeiculo.modelo);
        setValor(listaVeiculo.valor);
        setFoto(listaVeiculo.foto);
    }, [id, listaVeiculo.foto, listaVeiculo.marca, listaVeiculo.modelo, listaVeiculo.nomeVeiculo, listaVeiculo.valor]);

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
        setClasseAcao('salvar');
        setMensagemAcao('Atualizado com sucesso!');
        
        try{
            const corpoRequisicao = new FormData();
            corpoRequisicao.append('nome', nomeVeiculo);
            corpoRequisicao.append('marca', marca);
            corpoRequisicao.append('modelo', modelo);
            corpoRequisicao.append('valor', valor);
            corpoRequisicao.append('file', foto.arquivo);
            
            await veiculoService.editarVeiculos(id, corpoRequisicao);
            
        } catch(error){
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
            
            try{
                await veiculoService.deletarVeiculos(idVeiculo);
                
            } catch(error){
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
                        texto={"Salvar alterações"}
                        tipo="submit"
                        desabilitado={!validarFormulario() || estaSubmetendo}
                    />
                </form>
                    <Botao 
                        texto={"Deletar veículo?"}
                        cor="vermelho"
                        tipo="submit"
                        manipularClique={() =>  deletarVeiulo(id)}
                        desabilitado={estaSubmetendo}
                    />
            </div>
        </div>
        </>
    )
}

export default comAutorizacao(EditarVeiculos);