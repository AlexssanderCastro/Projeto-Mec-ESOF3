import { Request, Response } from 'express';
import { ItensOrcamentoBO } from '../modelo/BO/ItensOrcamentoBO';
import { ItemOrcamento } from '../modelo/dominio/itens_orcamento';
import { OrcamentoBO } from '../modelo/BO/OrcamentoBO';


export class ItensOrcamentoController {
    private itensBO = new ItensOrcamentoBO();
    private orcamentoBO = new OrcamentoBO();

    async adicionarItem(req: Request, res: Response) {
        try {
            const { orcamentoId, descricao_peca, quantidade, valor_unitario } = req.body;

            if (!orcamentoId || !descricao_peca || !quantidade || !valor_unitario) {
                return res.status(400).json({ erro: "Dados incompletos para adicionar item." });
            }

            const item = new ItemOrcamento(0, descricao_peca, valor_unitario, quantidade, orcamentoId);
            const novoItem = await this.itensBO.adicionarItem(item);
            console.log(novoItem);
            await this.orcamentoBO.atualizarValor(novoItem.quantidade*novoItem.valor_unitario,orcamentoId);

            return res.status(201).json(novoItem);

        } catch (erro) {
            console.error("Erro inesperado no controller:", erro);
            return res.status(500).json({ erro: "Erro ao processar requisição." });
        }
    }
}