import { Router, Request, Response } from 'express';
import { UsuarioController } from '../controlador/UsuarioController';

const router = Router();
const usuarioController = new UsuarioController();

router.post('/login', (req: Request, res: Response) => {
  usuarioController.login(req, res);
});

router.get('/usuario-logado', (req, res) => {
    usuarioController.obterUsuarioLogado(req, res);
});

router.get('/logout', (req: Request, res: Response) => {
  usuarioController.logout(req, res);
});



export default router;