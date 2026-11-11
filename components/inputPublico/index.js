
export default function InputPublico({
    tipo,
    texto,
    valor = "",
    exibirMensagemValidacao = false,
    mensagemValidacao = "",
    aoAlterarValor,
    disabled,
    opcoes,
    onClick
}) {
    return (
        <div className="inputPublicoContainer">
            <div className="inputPublico">
                
                {opcoes ? (
                    <select
                        aria-label={texto}
                        value={valor}
                        onChange={aoAlterarValor}
                        disabled={disabled}
                    >
                        <option value="">{texto}</option>
                        {opcoes.map((opcao) => (
                            <option key={opcao} value={opcao}>{opcao}</option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={tipo}
                        placeholder={texto}
                        value={valor}
                        onChange={aoAlterarValor}
                        disabled={disabled}
                        onClick={onClick}
                    />
                )}
            </div>

            {exibirMensagemValidacao && <p className="mensagemValidacao">{mensagemValidacao}</p>}
        </div>
    );
}