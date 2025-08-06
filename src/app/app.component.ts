import { Component } from '@angular/core';
import { ClientePixService } from './services/cliente-pix.service';
import { ClientePix } from './models/cliente-pix';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'gestor-pix-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  documentoBusca: string = '12345678900';
  contaIdBusca: string = '1234#56789-0';
  cliente: ClientePix | null = null;
  isLoading: boolean = false;

  novoCliente: {
    documento: string;
    contaId: string;
    limitePix: number | null;
    numeroAgencia: string;
    numeroConta: string;
  } = {
      documento: '',
      contaId: '',
      limitePix: null,
      numeroAgencia: '',
      numeroConta: ''
    };

  isCreating: boolean = false;
  isUpdating: boolean = false;
  isDeleting: boolean = false;

  valorTransacao: number | null = null;
  isProcessing: boolean = false;

  constructor(private clientePixService: ClientePixService, private toastr: ToastrService) { }

  buscarCliente(): void {
    this.isLoading = true;
    this.cliente = null;

    this.clientePixService.getClienteByKey(this.documentoBusca, this.contaIdBusca)
      .subscribe({
        next: (data) => {
          this.isLoading = false;
          if (data) {
            this.cliente = data;
            this.toastr.success('Cliente encontrado com sucesso!', 'Sucesso');
          } else {
            this.toastr.info('Nenhum cliente encontrado com os dados informados.', 'Sem resultados');
          }
        },
        error: (err) => {
          this.isLoading = false;
          if (err.status === 404) {
            this.toastr.error('Cliente não encontrado. Verifique os dados e tente novamente.', 'Cliente não encontrado');
          } else if (err.status === 400) {
            this.toastr.error('Dados de busca inválidos. Verifique o documento e ID da conta.', 'Dados inválidos');
          } else {
            this.toastr.error('Ocorreu um erro inesperado ao se comunicar com a API.', 'Erro de comunicação');
          }
        }
      });
  }

  criarCliente(): void {
    if (!this.novoCliente.documento || !this.novoCliente.contaId || !this.novoCliente.limitePix || !this.novoCliente.numeroAgencia || !this.novoCliente.numeroConta) {
      this.toastr.error("Todos os campos são obrigatórios.", "Erro de Validação");
      return;
    }

    this.isCreating = true;

    this.clientePixService.createCliente(this.novoCliente)
      .subscribe({
        next: (clienteCriado) => {
          this.isCreating = false;
          this.toastr.success(`Cliente ${clienteCriado.documento} criado com sucesso!`, 'Cliente criado');
          this.novoCliente = { documento: '', contaId: '', limitePix: null, numeroAgencia: '', numeroConta: '' };
        },
        error: (err) => {
          this.isCreating = false;
          if (err.status === 409) {
            this.toastr.error('Este cliente (documento/conta) já existe no sistema.', 'Cliente duplicado');
          } else if (err.status === 400) {
            this.toastr.error('Dados inválidos. Verifique as informações e tente novamente.', 'Dados inválidos');
          } else {
            this.toastr.error('Ocorreu um erro ao criar o cliente. Tente novamente.', 'Erro no servidor');
          }
        }
      });
  }

  atualizarLimite(): void {
    if (!this.cliente) {
      this.toastr.error("Nenhum cliente selecionado para atualizar.", "Cliente não selecionado");
      return;
    }

    if (this.cliente.limitePix === null || this.cliente.limitePix < 0) {
      this.toastr.error("O valor do limite não pode ser negativo.", "Valor inválido");
      return;
    }

    this.isUpdating = true;

    this.clientePixService.updateLimitePix(this.cliente.documento, this.cliente.contaId, this.cliente.limitePix)
      .subscribe({
        next: () => {
          this.isUpdating = false;
          this.toastr.success('Limite PIX atualizado com sucesso!', 'Limite atualizado');
        },
        error: (err) => {
          this.isUpdating = false;
          if (err.status === 404) {
            this.toastr.error('Cliente não encontrado. Pode ter sido removido por outro usuário.', 'Cliente não encontrado');
          } else if (err.status === 400) {
            this.toastr.error('Dados inválidos para atualização do limite.', 'Dados inválidos');
          } else {
            this.toastr.error('Ocorreu um erro ao atualizar o limite.', 'Erro no servidor');
          }
        }
      });
  }

  deletarCliente(): void {
    if (!this.cliente) {
      return;
    }

    const confirmacao = window.confirm('Tem certeza que deseja deletar este cliente? Esta ação não pode ser desfeita.');
    if (!confirmacao) {
      return;
    }

    this.isDeleting = true;

    const clienteParaDeletar = this.cliente;

    this.clientePixService.deleteCliente(clienteParaDeletar.documento, clienteParaDeletar.contaId)
      .subscribe({
        next: () => {
          this.isDeleting = false;
          this.cliente = null;
          this.toastr.success(`Cliente com documento ${clienteParaDeletar.documento} foi removido com sucesso.`, 'Cliente removido');
        },
        error: (err) => {
          this.isDeleting = false;
          if (err.status === 404) {
            this.toastr.error('Cliente não encontrado. Pode ter sido removido por outro usuário.', 'Cliente não encontrado');
          } else {
            this.toastr.error('Ocorreu um erro ao remover o cliente.', 'Erro no servidor');
          }
        }
      });
  }

  processarTransacao(): void {
    if (!this.cliente) return;

    if (!this.valorTransacao || this.valorTransacao <= 0) {
      this.toastr.error('Por favor, insira um valor de transação válido e positivo.', 'Valor inválido');
      return;
    }

    this.isProcessing = true;

    this.clientePixService.processarTransacao(this.cliente.documento, this.cliente.contaId, this.valorTransacao)
      .subscribe({
        next: (response) => {
          this.isProcessing = false;

          if (response.aprovado) {
            this.toastr.success(response.mensagem, 'Transação Aprovada');
            if (response.novoLimite !== undefined) {
              this.cliente!.limitePix = response.novoLimite;
            }
          } else {
            this.toastr.warning(response.mensagem, 'Transação Recusada');
          }

          this.valorTransacao = null;
        },
        error: (err) => {
          this.isProcessing = false;
          if (err.status === 400) {
            this.toastr.error('Dados da transação são inválidos. Verifique o valor informado.', 'Dados inválidos');
          } else if (err.status === 404) {
            this.toastr.error('Cliente não encontrado para processar a transação.', 'Cliente não encontrado');
          } else {
            this.toastr.error('Ocorreu um erro de comunicação com a API.', 'Erro de comunicação');
          }
        }
      });
  }

}
