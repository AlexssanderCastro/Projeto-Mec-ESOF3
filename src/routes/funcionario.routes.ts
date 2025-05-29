import { Router } from 'express';
import FuncionarioController from '../controlador/FuncionarioController';

const router = Router();

router.post('/cadastrar-funcionario', FuncionarioController.cadastrar);

export default router;
