// ...
import { Observable } from 'rxjs';
import { ClientePix } from '../models/cliente-pix';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransacaoResponse } from '../models/transacao-response';

@Injectable({
  providedIn: 'root'
})
export class ClientePixService {
  private apiUrl = `${environment.apiUrl}/clientepix`;

  constructor(private http: HttpClient) { }

  getClienteByKey(documento: string, contaId: string): Observable<ClientePix> {
    const encodedDocumento = encodeURIComponent(documento);
    const encodedContaId = encodeURIComponent(contaId);

    const url = `${this.apiUrl}/${encodedDocumento}/${encodedContaId}`;

    return this.http.get<ClientePix>(url);
  }

  createCliente(cliente: Omit<ClientePix, 'limitePix'> & { limitePix: number | null }): Observable<ClientePix> {
    return this.http.post<ClientePix>(this.apiUrl, cliente);
  }

   updateLimitePix(documento: string, contaId: string, novoLimite: number): Observable<void> {
    const encodedDocumento = encodeURIComponent(documento);
    const encodedContaId = encodeURIComponent(contaId);

    const url = `${this.apiUrl}/${encodedDocumento}/${encodedContaId}/limite`;
    const body = { novoLimitePix: novoLimite };

    return this.http.patch<void>(url, body);
  }

  deleteCliente(documento: string, contaId: string): Observable<void> {
    const encodedDocumento = encodeURIComponent(documento);
    const encodedContaId = encodeURIComponent(contaId);

    const url = `${this.apiUrl}/${encodedDocumento}/${encodedContaId}`;

    return this.http.delete<void>(url);
  }

   processarTransacao(documento: string, contaId: string, valor: number): Observable<TransacaoResponse> {
    const encodedDocumento = encodeURIComponent(documento);
    const encodedContaId = encodeURIComponent(contaId);

    const url = `${this.apiUrl}/${encodedDocumento}/${encodedContaId}/processar-transacao`;
    const body = { valor: valor };

    return this.http.post<TransacaoResponse>(url, body);
  }
}
