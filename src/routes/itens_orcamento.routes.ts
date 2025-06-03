import { Router, Request, Response } from 'express';
import path from 'path';
import { ItensOrcamentoController } from '../controlador/ItensOrcamentoController';


const router: Router = Router();
const itensController = new ItensOrcamentoController();


router.post("/adicionar-item-orcamento", async (req, res, next) => {
  try {
    await itensController.adicionarItem(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;