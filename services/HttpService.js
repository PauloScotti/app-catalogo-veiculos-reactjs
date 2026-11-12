import axios from 'axios';
import { AcaoMensagem } from "../helpers/AcaoMensagem";
import { encerrarSessao, temSessao } from "../utils/sessao";

export default class HttpService {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL + '/api'
        });

        this.quantidadeRequisicoes = 0;
        this.axios.interceptors.request.use((config) => {
            this.quantidadeRequisicoes++;
            if (this.quantidadeRequisicoes === 1) {
                AcaoMensagem.exibir();
            }

            const token = localStorage.getItem('tokenAdm') || localStorage.getItem('token');
            if (token) {
                config.headers.Authorization = 'Bearer ' + token
            }

            return config;
        });

        const aoTerminar = () => {
            this.quantidadeRequisicoes--;
            if (this.quantidadeRequisicoes === 0) {
                AcaoMensagem.ocultar();
            }
        };

        this.axios.interceptors.response.use(
            (response) => {
                aoTerminar();
                return response;
            },
            (erro) => {
                // Sem isto, uma requisição com erro deixava a mensagem de ação presa na tela.
                aoTerminar();

                // Token expirado ou inválido: encerra a sessão e volta para o login.
                if (erro?.response?.status === 401 && temSessao()) {
                    encerrarSessao();
                    window.location.href = '/login';
                }
                return Promise.reject(erro);
            }
        );
    }

    post(url, data) {
        return this.axios.post(url, data);
    }

    get(url) {
        return this.axios.get(url);
    }

    put(url, data) {
        return this.axios.put(url, data);
    }

    delete(url) {
        return this.axios.delete(url);
    }
}
