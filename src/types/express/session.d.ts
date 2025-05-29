import 'express-session';
import { PerfilUsuario } from '../PerfilUsuario';

declare module 'express-session' {
  interface SessionData {
    usuario: {
      id: number;
      login: string;
      perfil: PerfilUsuario;
    };
  }
}