import { Servico } from "../dominio/servico";
import { ServicoDAO } from "../DAO/ServicoDAO";
import { enviarEmail } from '../../servicos/emailService';
import { Status } from '../../types/Status'

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

    public async buscarAtivosCliente(id: number): Promise<any[]> {
        const servicos = await this.servicoDAO.buscarAtivosCliente(id);

        return servicos.map(s => ({
            id: s.id,
            descricao: s.descricao,
            status: s.status,
            clienteNome: s.cliente?.nome ?? 'Desconhecido',
        }));
    }

    public async buscarInativosCliente(id: number): Promise<any[]> {
        const servicos = await this.servicoDAO.buscarInativosCliente(id);

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

    async atualizarStatus(id: number): Promise<Servico | null> {
        const servico = await this.buscarServicoPorId(id);
        if (!servico) return null;

        let novoStatus: Status;

        if (servico.status === 'Em análise') {
            novoStatus = 'Aguardando confirmação';
        } else if (servico.status === 'Aguardando confirmação') {
            novoStatus = 'Consertando';
        } else if (servico.status === 'Aguardando pagamento') {
            novoStatus = 'Finalizado';
        } else if (servico.status === 'Consertando') {
            novoStatus = 'Aguardando pagamento';
        } else {
            // Se não encaixa em nenhum status esperado, não atualiza
            return null;
        }

        servico.status = novoStatus;

        try {
            // Atualiza no banco via DAO e recebe o objeto atualizado
            const servicoAtualizado = await this.servicoDAO.atualizarStatus(servico);
            if (!servicoAtualizado?.cliente) {
                return null;
            }
            // Envia email para o cliente
            const emailCliente = servicoAtualizado.cliente.email;
            const assunto = 'Atualização do status do seu serviço';
            let mensagemExtra = '';

            if (novoStatus === 'Aguardando pagamento') {
                mensagemExtra = '<p><strong>Realize o pagamento</strong> para finalizarmos o serviço.</p>';
            } else if (novoStatus === 'Aguardando confirmação') {
                mensagemExtra = '<p><strong>Confirme o serviço</strong> para prosseguirmos com o conserto.</p>';
            }

            const mensagemHtml = `
                        <p>Olá, ${servicoAtualizado.cliente.nome}</p>
                        <p>O status do seu serviço na <strong>MasterCar Automecânica</strong> foi atualizado:</p>
                        <p><strong>Descrição do Serviço:</strong>${servicoAtualizado.descricao}</p>
                        <p>Novo status: <strong>${novoStatus}</strong></p>
                        ${mensagemExtra}
                        <p>Obrigado por confiar em nossos serviços!</p>
                `;

            await enviarEmail(emailCliente, assunto, mensagemHtml);
            console.log('Email enviado para o cliente com sucesso.');

            //console.log(emailCliente, assunto, mensagemHtml);

            return servicoAtualizado;
        } catch (erro) {
            console.error('Erro ao atualizar status ou enviar email:', erro);
            return null;
        }
    }

    async cancelarServico(id: number) {
        const servico = await this.buscarServicoPorId(id);
        if (servico) {
            if (servico.status == "Aguardando confirmação") {
                servico.status = "Cancelado";
            } else {
                return null;
            }
        } else {
            return null;
        }

        const servicoAtualizado = await this.servicoDAO.atualizarStatus(servico);
        if (!servicoAtualizado?.cliente) {
            return null;
        }
        // Envia email para o cliente
        const emailCliente = servicoAtualizado.cliente.email;
        const assunto = 'Cancelamento do seu serviço';
        let mensagemExtra = 'Venha buscar seu veículo se ainda não tiver buscado';

        
        

        const mensagemHtml = `
                        <p>Olá, ${servicoAtualizado.cliente.nome}</p>
                        <p>O seu serviço na <strong>MasterCar Automecânica</strong> foi cancelado:</p>
                        <p><strong>Descrição do Serviço:</strong>${servicoAtualizado.descricao}</p>
                        ${mensagemExtra}
                        <p>Obrigado por confiar em nossos serviços!</p>
                `;

        await enviarEmail(emailCliente, assunto, mensagemHtml);
        console.log('Email de cancelamento enviado para o cliente com sucesso.');

        return servicoAtualizado;
    }

    public async gerarRelatorio() {
        return await this.servicoDAO.gerarRelatorio();
    }

}