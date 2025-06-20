import { Request, Response } from 'express';
import { UsuarioBO } from '../modelo/BO/UsuarioBO';
import  bcrypt  from 'bcrypt';

export class UsuarioController {
  private usuarioBO = new UsuarioBO();

  public async login(req: Request, res: Response) {
    const { login, senha } = req.body;

    if (!login || !senha) {
      return res.status(400).send('Login e senha são obrigatórios');
    }

    const usuario = await this.usuarioBO.buscarPorLoginSenha(login,senha);
    
    if (!usuario) {
      return res.status(401).send('Usuário ou senha inválidos');
    }

    // Salvando na sessão
    req.session.usuario = {
      id: usuario.id,
      login: usuario.login,
      perfil: usuario.perfil
    };

    // Redirecionamento conforme perfil
    if (usuario.perfil === 'cliente') {
      res.redirect('/cliente.html');
    } else if (usuario.perfil === 'gerente') {
      res.redirect('/gerente.html');
    } else if (usuario.perfil === 'funcionario') {
      res.redirect('/funcionario.html');
    } else {
      res.status(403).send('Perfil não reconhecido.');
    }
  }

  public obterUsuarioLogado(req: Request, res: Response) {
    if (req.session.usuario) {
      res.json(req.session.usuario);
    } else {
      res.status(401).json({ mensagem: 'Usuário não autenticado' });
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    req.session.destroy(err => {
      if (err) {
        console.error('Erro ao encerrar sessão:', err);
        res.status(500).send('Erro ao encerrar sessão.');
        return;
      }
      res.redirect('/');
    });
  } 
}


