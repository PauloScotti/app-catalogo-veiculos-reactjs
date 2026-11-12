const CHAVES = ['token', 'tokenAdm', 'nome', 'email', 'id', 'nivelAcesso'];

export function encerrarSessao() {
    CHAVES.forEach((chave) => localStorage.removeItem(chave));
}

export function temSessao() {
    return Boolean(localStorage.getItem('token') || localStorage.getItem('tokenAdm'));
}
