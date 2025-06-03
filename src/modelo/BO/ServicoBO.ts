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

    public async buscarAtivos(): Promise<any[]> {
        const servicos = await this.servicoDAO.buscarAtivos();

        return servicos.map(s => ({
            id: s.id,
            descricao: s.descricao,
            status: s.status,
            clienteNome: s.cliente?.nome ?? 'Desconhecido',
        }));
    }

    public async buscarServicoPorId(id: number): Promise<Servico | null> {
        
        return await this.servicoDAO.buscarServicoPorId(id);
    }

    async atualizarStatus(id: number) {
        const servico = await this.buscarServicoPorId(id);
        if(servico){
            if(servico.status==='Em análise'){
                servico.status='Aguardando confirmação';
            }else if(servico.status==='Aguardando confirmação'){
                servico.status='Consertando';
            }else if(servico.status==='Aguardando pagamento'){
                servico.status='Finalizado';
            }else if(servico.status==='Consertando'){
                servico.status='Aguardando pagamento';
            }

        }
        
        return await this.servicoDAO.atualizarStatus(servico);
    }

}