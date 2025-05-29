import { Request, Response } from 'express';
import { ServicoBO } from '../modelo/BO/ServicoBO';
import { Servico } from '../modelo/dominio/servico';
import { Cliente } from '../modelo/dominio/cliente';
import { Usuario } from '../modelo/dominio/usuario';

export class ServicoController {
    private servicoBO = new ServicoBO();

    public async criar(req: Request, res: Response) {
        try {
            const { clienteId, descricao } = req.body;

            
            if (!clienteId || !descricao) {
                res.status(400).json({ mensagem: 'Cliente e descrição são obrigatórios.' });
                return;
            }
            const usuario = new Usuario(0,'','','cliente');
            
            const cliente = new Cliente(clienteId, usuario, '', new Date(), '', '', '');

            
            const servico = new Servico(0, descricao, 'Em análise',cliente);

            // Chamar o BO para salvar o serviço no banco
            const servicoCriado = await this.servicoBO.criar(servico);

            res.status(201).json(servicoCriado); // Retorna o serviço criado (ou o id)
        } catch (error) {
            console.error('Erro ao criar serviço:', error);
            res.status(500).json({ mensagem: 'Erro interno ao criar serviço.' });
        }
    }

}
