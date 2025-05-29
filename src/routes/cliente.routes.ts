import { Router, Request, Response } from 'express';
import path from 'path';
import {ClienteController} from '../controlador/ClienteController';

const router: Router = Router();
const clienteController = new ClienteController();

// Rota de exibição da página de cadastro do cliente
router.get('/cadastro-cliente.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'cadastro-cliente.html'));
});

router.get('/cliente.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'cliente.html'));
});

router.post('/cadastrar-cliente', (req, res) => {
  clienteController.cadastrarCliente(req, res);
});
  
router.get('/cliente-logado', (req: Request, res: Response) => {
  clienteController.obterClienteLogado(req, res);
});

router.get('/clientes', (req, res) => {
  clienteController.buscarClientes(req, res);
});

export default router;