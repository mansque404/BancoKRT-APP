export interface TransacaoResponse {
  aprovado: boolean;
  mensagem: string;
  novoLimite?: number;
}
