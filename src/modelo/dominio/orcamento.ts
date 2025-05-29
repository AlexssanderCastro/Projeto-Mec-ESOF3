// orcamento.ts
import { Cliente } from './cliente';

export class Orcamento {
  private _id: number;
  private _cliente: Cliente; // Agora é um objeto Cliente
  private _data_orcamento: Date;
  private _valor_total: number;

  constructor(id: number, cliente: Cliente, valor_total: number) {
    this._id = id;
    this._cliente = cliente;
    this._data_orcamento = new Date();
    this._valor_total = valor_total;
  }

  // Getters and Setters
  get id() {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get cliente() {
    return this._cliente;
  }

  set cliente(cliente: Cliente) {
    this._cliente = cliente;
  }

  get data_orcamento() {
    return this._data_orcamento;
  }

  set data_orcamento(data_orcamento: Date) {
    this._data_orcamento = data_orcamento;
  }

  get valor_total() {
    return this._valor_total;
  }

  set valor_total(valor_total: number) {
    this._valor_total = valor_total;
  }
}
