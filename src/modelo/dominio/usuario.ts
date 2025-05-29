import { PerfilUsuario } from "../../types/PerfilUsuario";

export class Usuario {
    private _id: number;
    private _login: string;
    private _senha: string;
    private _perfil:PerfilUsuario;
  
    constructor(id: number, login: string, senha: string, perfil: PerfilUsuario) {
      this._id = id;
      this._login = login;
      this._senha = senha;
      this._perfil = perfil;
    }
  
    // Getters and Setters
    get id() {
      return this._id;
    }
  
    set id(id: number) {
      this._id = id;
    }
  
    get login() {
      return this._login;
    }
  
    set login(login: string) {
      this._login = login;
    }
  
    get senha() {
      return this._senha;
    }
  
    set senha(senha: string) {
      this._senha = senha;
    }
  
    get perfil() {
      return this._perfil;
    }
  
    set perfil(perfil: 'cliente' | 'funcionario' | 'gerente') {
      this._perfil = perfil;
    }
  }