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
            await this.orcamentoBO.atualizarValor(novoItem.quantidade * novoItem.valor_unitario, orcamentoId);

            return res.status(201).json(novoItem);

        } catch (erro) {
            console.error("Erro inesperado no controller:", erro);
            return res.status(500).json({ erro: "Erro ao processar requisição." });
        }
    }

    async deletarItem(req: Request, res: Response) {
        try {
            const itemId = parseInt(req.params.id);

            if (isNaN(itemId)) {
                return res.status(400).json({ erro: "ID inválido." });
            }

            // Buscar o item no banco para saber o valor e a quantidade
            const item = await this.itensBO.buscarItem(itemId);

            if (!item) {
                return res.status(404).json({ erro: "Item não encontrado." });
            }

            // Remover o item
            const removido = await this.itensBO.deletarItem(itemId);

            if (!removido) {
                return res.status(500).json({ erro: "Erro ao remover o item." });
            }

            // Atualizar o valor do orçamento
            const desconto = item.quantidade * item.valor_unitario;
            await this.orcamentoBO.atualizarValor(-desconto, item.id_orcamento);

            return res.status(204).send(); // Sucesso, sem conteúdo

        } catch (erro) {
            console.error("Erro inesperado no controller:", erro);
            return res.status(500).json({ erro: "Erro interno ao remover item." });
        }
    }




    async buscarItem(id: number) {
        if (!id) {
            return null;
        }

        this.itensBO.buscarItem(id);

    }
}