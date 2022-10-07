
export default function InputPublico({
    tipo,
    texto,
    valor = "",
    exibirMensagemValidacao = false,
    mensagemValidacao = "",
    aoAlterarValor,
    disabled,
    onClick
}) {
    return (
        <div className="inputPublicoContainer">
            <div className="inputPublico">
                
                <input
                    type={tipo}
                    placeholder={texto}
                    value={valor}
                    onChange={aoAlterarValor}
                    disabled={disabled}
                    onClick={onClick}
                />
            </div>

            {exibirMensagemValidacao && <p className="mensagemValidacao">{mensagemValidacao}</p>}
        </div>
    );
}