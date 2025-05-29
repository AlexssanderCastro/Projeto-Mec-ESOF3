// servico.ts
import { Cliente } from './cliente';
import { Orcamento } from './orcamento';

export class Servico {
  private _id: number;
  private _cliente: Cliente | null; // Agora é um objeto Cliente ou null
  private _orcamento: Orcamento | null; // Agora é um objeto Orcamento ou null
  private _descricao: string;
  private _status: 'pendente' | 'concluido';
  private _data_inicio: Date;
  private _data_fim: Date | null;

  constructor(id: number, descricao: string, cliente?: Cliente, orcamento?: Orcamento) {
    this._id = id;
    this._descricao = descricao;
    this._status = 'pendente';
    this._data_inicio = new Date();
    this._data_fim = null;
    this._cliente = cliente || null;
    this._orcamento = orcamento || null;
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

  set cliente(cliente: Cliente | null) {
    this._cliente = cliente;
  }

  get orcamento() {
    return this._orcamento;
  }

  set orcamento(orcamento: Orcamento | null) {
    this._orcamento = orcamento;
  }

  get descricao() {
    return this._descricao;
  }

  set descricao(descricao: string) {
    this._descricao = descricao;
  }

  get status() {
    return this._status;
  }

  set status(status: 'pendente' | 'concluido') {
    this._status = status;
  }

  get data_inicio() {
    return this._data_inicio;
  }

  set data_inicio(data_inicio: Date) {
    this._data_inicio = data_inicio;
  }

  get data_fim() {
    return this._data_fim;
  }

  set data_fim(data_fim: Date | null) {
    this._data_fim = data_fim;
  }
}