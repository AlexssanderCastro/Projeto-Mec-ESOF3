import { Request, Response } from 'express';
import { ItemOrcamento } from '../dominio/itens_orcamento';
import { ItensOrcamentoDAO } from '../DAO/ItensOrcamentoDAO';

export class ItensOrcamentoBO {
    private itensDAO: ItensOrcamentoDAO;

    constructor() {
        this.itensDAO = new ItensOrcamentoDAO();
    }


    async adicionarItem(item: ItemOrcamento): Promise<ItemOrcamento> {
        if (!item.descricao_peca || item.quantidade <= 0 || item.valor_unitario <= 0) {
            throw new Error("Dados inválidos para o item de orçamento.");
        }

        return await this.itensDAO.inserir(item);
    }

}