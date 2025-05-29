// funcionario.ts
import { Usuario } from './usuario';

export class Funcionario {
  private _id: number;
  private _usuario: Usuario; // Agora é um objeto Usuario
  private _nome: string;
  private _cpf: string;
  private _data_nascimento: Date;
  private _cargo: string;
  private _salario: number;
  private _email: string;
  private _telefone: string ;
  private _endereco: string ;

  constructor(id: number, usuario: Usuario, nome: string, cpf: string, data_nascimento: Date, cargo: string, salario: number, email: string,endereco: string,telefone: string) {
    this._id = id;
    this._usuario = usuario;
    this._nome = nome;
    this._cpf = cpf;
    this._data_nascimento = data_nascimento;
    this._cargo = cargo;
    this._salario = salario;
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

  get cpf() {
    return this._cpf;
  }

  set cpf(cpf: string) {
    this._cpf = cpf;
  }

  get data_nascimento() {
    return this._data_nascimento;
  }

  set data_nascimento(data_nascimento: Date) {
    this._data_nascimento = data_nascimento;
  }

  get cargo() {
    return this._cargo;
  }

  set cargo(cargo: string) {
    this._cargo = cargo;
  }

  get salario() {
    return this._salario;
  }

  set salario(salario: number) {
    this._salario = salario;
  }

  get email() {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
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

  set endereco(endereco: string) {
    this._endereco = endereco;
  }
}

