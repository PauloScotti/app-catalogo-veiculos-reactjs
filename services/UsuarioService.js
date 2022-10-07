import HttpService from "./HttpService";

export default class UsuarioService extends HttpService {
    async login(credenciais) {
        const {data} = await this.post('/login', credenciais);
        console.log(data);
        
        localStorage.setItem("nome", data.nome);
        localStorage.setItem("email", data.email);
        localStorage.setItem("nivelAcesso", data.nivelAcesso);
        
        if(data.token){
            localStorage.setItem("token", data.token);
        }
        
        if(data.tokenAdm){
            localStorage.setItem("tokenAdm", data.tokenAdm);
        }

        const usuario = await this.get('/usuario');
        localStorage.setItem('id', usuario.data._id);
    }

    async logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenAdm');
        localStorage.removeItem('nome');
        localStorage.removeItem('email');
        localStorage.removeItem('id');
        localStorage.removeItem('nivelAcesso');
    }

    async cadastroUsuarios(dados) {
        return this.post('/cadastroUsuarios', dados);
    }

    estaAutenticado() {
        return localStorage.getItem('token');
    }

    estaAutenticadoAdm() {
        return localStorage.getItem('tokenAdm');
    }

    obterInformacoesDoUsuarioLogado() {
        return {
            id: localStorage.getItem('id'),
            nome: localStorage.getItem('nome'),
            email: localStorage.getItem('email'),
            nivelAcesso: localStorage.getItem('nivelAcesso')
        }
    }
}