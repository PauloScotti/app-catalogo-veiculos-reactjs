const validarNome = (nome) => {
    return nome?.toString().length > 2;
}

const validarnivelAcesso = (nivelAcesso) => {
    return nivelAcesso?.toString().length > 4;
}

const validarEmail = (email) => {
    const emailStr = email?.toString();
    return emailStr.length >= 5 && emailStr.includes('@') && emailStr.includes('.');
}

const validarSenha = (senha) => {
    return senha?.toString().length > 3;
}

const validarConfirmacaoSenha = (senha, confirmacao) => {
    return validarSenha(senha) && senha === confirmacao;
}

const validaMarca = (marca) => {
    return marca?.toString().length > 3;
}

const validaNomeVeiculo = (nomeVeiculo) => {
    return nomeVeiculo?.toString().length > 2;
}

const validaModelo = (modelo) => {
    return modelo?.length > 3;
}

const validaValor = (valor) => {
    return valor?.toString().length > 3;
}

const validaFoto = (foto) => {
    return !foto;
}

export {
    validarNome,
    validarEmail,
    validarSenha,
    validarConfirmacaoSenha,
    validarnivelAcesso,
    validaMarca,
    validaModelo,
    validaValor,
    validaNomeVeiculo,
    validaFoto
}