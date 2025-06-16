// cliente.ts
import { Usuario } from './usuario';

export class Cliente {
  private _id: number;
  private _usuario: Usuario; 
  private _nome: string;
  private _data_nascimento: Date;
  private _telefone: string;
  private _endereco: string | null;
  private _cpf: string;
  private _email: string;

  constructor(id: number, usuario: Usuario, nome: string, data_nascimento: Date, cpf: string, email: string,telefone: string, endereco: string | null) {
    this._id = id;
    this._usuario = usuario;
    this._nome = nome;
    this._data_nascimento = data_nascimento;
    this._cpf = cpf;
    this._email = email;
    this._telefone = telefone;
    this._endereco = endereco;
  }

  // Getters and Setters
  get id() {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get usuario() {
    return this._usuario;
  }

  set usuario(usuario: Usuario) {
    this._usuario = usuario;
  }

  get nome() {
    return this._nome;
  }

  set nome(nome: string) {
    this._nome = nome;
  }

  get data_nascimento() {
    return this._data_nascimento;
  }

  set data_nascimento(data_nascimento: Date) {
    this._data_nascimento = data_nascimento;
  }

  get telefone() {
    return this._telefone;
  }

  set telefone(telefone: string ) {
    this._telefone = telefone;
  }

  get endereco() {
    return this._endereco;
  }

  set endereco(endereco: string | null) {
    this._endereco = endereco;
  }

  get cpf() {
    return this._cpf;
  }

  set cpf(cpf: string) {
    this._cpf = cpf;
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }
}

