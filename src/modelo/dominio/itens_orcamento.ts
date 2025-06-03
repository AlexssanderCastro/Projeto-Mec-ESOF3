// itens_orcamento.ts

export class ItemOrcamento {
  private _id: number;
  private _descricao_peca: string;
  private _valor_unitario: number;
  private _quantidade: number;
  private _id_orcamento: number | null;

  constructor(id: number, descricao_peca: string, valor_unitario: number, quantidade: number, id_orcamento?: number | null) {
    this._id = id;
    this._descricao_peca = descricao_peca;
    this._valor_unitario = valor_unitario;
    this._quantidade = quantidade;
    this._id_orcamento = id_orcamento || null;
  }

  // Getters and Setters
  get id() {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get id_orcamento(): number | null {
    return this._id_orcamento;
  }

  set id_orcamento(id_orcamento: number) {
    this._id_orcamento = id_orcamento;
  }



  get descricao_peca() {
    return this._descricao_peca;
  }

  set descricao_peca(descricao_peca: string) {
    this._descricao_peca = descricao_peca;
  }

  get valor_unitario() {
    return this._valor_unitario;
  }

  set valor_unitario(valor_unitario: number) {
    this._valor_unitario = valor_unitario;
  }

  get quantidade() {
    return this._quantidade;
  }

  set quantidade(quantidade: number) {
    this._quantidade = quantidade;
  }
}
