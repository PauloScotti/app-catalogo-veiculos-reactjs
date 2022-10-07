import HttpService from "./HttpService";

export default class VeiculosService extends HttpService {
    
    async listarVeiculos() {
        return this.get('/veiculos');
    }

    async listarVeiculosPorId(id, dados) {
        return this.get(`/veiculos?id=${id}`, dados);
    }

    async cadastrarVeiculos(dados) {
        return this.post(`/cadastroVeiculos`, dados);
    }

    async editarVeiculos(id, dados) {
        return this.put(`/editarVeiculos?id=${id}`, dados);
    }

    async deletarVeiculos(id) {
        return this.delete(`/deletarVeiculos?id=${id}`);
    }
}