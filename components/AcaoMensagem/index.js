export default function BotaoSalvar ({
    classe,
    mensagem
}) {
    return (
        <div className={`oculto exibir ${classe}`}>
            <p>{mensagem}</p>
        </div>
    );
}