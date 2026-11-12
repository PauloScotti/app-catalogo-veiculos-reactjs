const validarNome = (nome) => {
    return nome?.toString().length > 2;
}

export const NIVEIS_DE_ACESSO = ['Cliente', 'Administrador'];

const validarnivelAcesso = (nivelAcesso) => {
    return NIVEIS_DE_ACESSO.includes(nivelAcesso);
}

const validarEmail = (email) => {
    const emailStr = email?.toString();
    return emailStr?.length >= 5 && emailStr.includes('@') && emailStr.includes('.');
}

const validarSenha = (senha) => {
    return senha?.toString().length > 3;
}

// Senha de conta nova: a API exige pelo menos 8 caracteres. O login continua
// aceitando as senhas mais curtas de contas antigas.
const validarSenhaNova = (senha) => {
    return senha?.toString().length >= 8;
}

const validarConfirmacaoSenha = (senha, confirmacao) => {
    return validarSenhaNova(senha) && senha === confirmacao;
}

const validaMarca = (marca) => {
    return marca?.toString().trim().length >= 2;
}

const validaNomeVeiculo = (nomeVeiculo) => {
    return nomeVeiculo?.toString().length > 2;
}

const validaModelo = (modelo) => {
    return modelo?.toString().trim().length >= 2;
}

const validaValor = (valor) => {
    return Number(valor) > 0;
}

const validaFoto = (foto) => {
    return !foto;
}

export {
    validarNome,
    validarEmail,
    validarSenha,
    validarSenhaNova,
    validarConfirmacaoSenha,
    validarnivelAcesso,
    validaMarca,
    validaModelo,
    validaValor,
    validaNomeVeiculo,
    validaFoto
}