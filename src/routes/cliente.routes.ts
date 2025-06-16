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

router.get('/acompanhar-servicos.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'acompanhar-servicos.html'));
});

router.get('/acompanhar-servico.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'acompanhar-servico.html'));
});

router.get('/historico-servicos.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'historico-servicos.html'));
});
router.get('/editar-perfil.html', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'editar-perfil.html'));
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

router.put("/editar-cliente", (req, res) => clienteController.editarCliente(req, res));

router.get('/editar-cliente-dados', (req, res) => clienteController.buscarClienteLogado(req, res));

router.put('/trocar-senha', async (req, res) => {
  try {
    await clienteController.trocarSenha(req, res);
  } catch (error) {
    console.error("Erro na rota /trocar-senha:", error);
    res.status(500).json({ mensagem: "Erro interno no servidor." });
  }
});

router.get('/listar-clientes', (req, res) => clienteController.buscarTodosClientes(req, res));



export default router;