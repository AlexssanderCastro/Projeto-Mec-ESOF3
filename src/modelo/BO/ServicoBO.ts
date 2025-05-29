import { Servico } from "../dominio/servico";
import { ServicoDAO } from "../DAO/ServicoDAO";

export class ServicoBO {
    private servicoDAO: ServicoDAO;

    constructor() {
        this.servicoDAO = new ServicoDAO();
    }

    public async criar(servico: Servico): Promise<Servico> {
        if (!servico.cliente || !servico.cliente.id) {
            throw new Error('Cliente inválido ou não informado.');
        }

        const servicoCriado = await this.servicoDAO.criar(servico);
        return servicoCriado;
    }

}