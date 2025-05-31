// orcamento.ts
import { Cliente } from './cliente';
import { ItemOrcamento } from './itens_orcamento';

export class Orcamento {
  private _id: number;
  
  private _data_orcamento: Date;
  private _valor_total: number;
  private _itens: ItemOrcamento[];

  constructor(id: number, valor_total: number, itens: ItemOrcamento[], data_orcamento?: Date) {
    this._id = id;
    this._data_orcamento = data_orcamento ?? new Date(); // Se não vier, usa a data atual
    this._valor_total = valor_total;
    this._itens = itens;
  }

  // Getters e Setters
  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  

  get data_orcamento(): Date {
    return this._data_orcamento;
  }

  set data_orcamento(data_orcamento: Date) {
    this._data_orcamento = data_orcamento;
  }

  get valor_total(): number {
    return this._valor_total;
  }

  set valor_total(valor_total: number) {
    this._valor_total = valor_total;
  }

  get itens(): ItemOrcamento[] {
    return this._itens;
  }

  set itens(itens: ItemOrcamento[]) {
    this._itens = itens;
  }
}

