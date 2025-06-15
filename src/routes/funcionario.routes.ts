
import path from 'path';
import { Router, Request, Response } from 'express';
import {FuncionarioController} from '../controlador/FuncionarioController';

const router = Router();

const funcionarioController = new FuncionarioController();


router.get('/funcionario.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'funcionario.html'));
});

router.post('/cadastrar-funcionario', (req, res) =>funcionarioController.cadastrar(req, res));

router.get('/listar-funcionarios', (req, res) => funcionarioController.listar(req, res));

router.get('/buscar-funcionario/:id', (req, res) => funcionarioController.buscarPorId(req, res));

router.post('/editar-funcionario', async (req, res, next) => {
  try {
    await funcionarioController.editar(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete('/excluir-funcionario/:id', async (req, res, next) => {
  try {
    await funcionarioController.excluir(req, res);
  } catch (err) {
    next(err);
  }
});







export default router;
