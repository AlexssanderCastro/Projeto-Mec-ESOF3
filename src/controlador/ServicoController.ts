import { Request, Response } from 'express';
import { ServicoBO } from '../modelo/BO/ServicoBO';
import { Servico } from '../modelo/dominio/servico';
import { Orcamento } from '../modelo/dominio/orcamento';
import { Cliente } from '../modelo/dominio/cliente';
import { Usuario } from '../modelo/dominio/usuario';
import { OrcamentoController } from '../controlador/OrcamentoController';

export class ServicoController {
    private servicoBO = new ServicoBO();
    private orcamentoController = new OrcamentoController();

    public async criar(req: Request, res: Response) {
        try {
            const { clienteId, descricao } = req.body;


            if (!clienteId || !descricao) {
                res.status(400).json({ mensagem: 'Cliente e descrição são obrigatórios.' });
                return;
            }

            const orcamento = await this.orcamentoController.criarOrcamentoGenerico();

            const usuario = new Usuario(0, '', '', 'cliente');

            const cliente = new Cliente(clienteId, usuario, '', new Date(), '', '', '');


            const servico = new Servico(0, descricao, 'Em análise', cliente, orcamento);

            // Chamar o BO para salvar o serviço no banco
            const servicoCriado = await this.servicoBO.criar(servico);

            res.status(201).json(servicoCriado); // Retorna o serviço criado (ou o id)
        } catch (error) {
            console.error('Erro ao criar serviço:', error);
            res.status(500).json({ mensagem: 'Erro interno ao criar serviço.' });
        }
    }


    public async listarAtivos(req: Request, res: Response): Promise<void> {
        try {
            const servicos = await this.servicoBO.buscarAtivos();
            res.status(200).json(servicos);
        } catch (error) {
            console.error('Erro ao buscar serviços ativos:', error);
            res.status(500).json({ mensagem: 'Erro ao buscar serviços ativos' });
        }
    }

    public async buscarServicoPorId(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ erro: 'ID inválido' });
            return;
        }

        try {

            const servico = await this.servicoBO.buscarServicoPorId(id);

            if (!servico) {
                res.status(404).json({ erro: 'Serviço não encontrado' });
                return;
            }
            
            res.status(200).json(servico);
        } catch (erro) {
            console.error('Erro ao buscar serviço:', erro);
            res.status(500).json({ erro: 'Erro interno do servidor' });
        }
    }

    async atualizarStatus(req: Request, res: Response): Promise<void> {
        const { id } = req.body;

        if (!id) {
            res.status(400).json({ erro: "ID do serviço não foi fornecido." });
            return;
        }

        try {
            const servicoAtualizado = await this.servicoBO.atualizarStatus(Number(id));
            res.status(200).json({ mensagem: "Status atualizado com sucesso", servico: servicoAtualizado });
        } catch (erro) {
            console.error("Erro ao atualizar status:", erro);
            res.status(500).send("Erro ao atualizar status.");
        }
    }

}
