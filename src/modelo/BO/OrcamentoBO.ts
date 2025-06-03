import { Request, Response } from 'express';
import { Orcamento } from '../dominio/orcamento';
import { OrcamentoDAO } from '../DAO/OrcamentoDAO';


export class OrcamentoBO {
    private orcamentoDAO: OrcamentoDAO;

    constructor() {
            this.orcamentoDAO = new OrcamentoDAO();
    }

    public async criarOrcamentoGenerico(): Promise<Orcamento | null> {
        const orcamento = new Orcamento(0,0);
        return await this.orcamentoDAO.criarOrcamentoGenerico(orcamento);
    }

    public async atualizarValor(valor:number,id:number | null): Promise<void> {

        await this.orcamentoDAO.atualizarValor(valor,id);

    }

}