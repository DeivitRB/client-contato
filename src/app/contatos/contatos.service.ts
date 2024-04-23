import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filtroContatos } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class ContatosService {
  URL = 'http://127.0.0.1:3333';

  constructor(private http: HttpClient) {}

  async fnGetContatos(objFiltro: filtroContatos) {
    let params = new HttpParams();
    Object.keys(objFiltro).forEach((key) => {
      params = params.append(key, objFiltro[key]);
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept',
      }),
      params: params,
    };

    return await this.http.get<any>(this.URL + `/contatos`, httpOptions);
  }

  async fnGetContato(id: number) {
    return await this.http.get<any>(this.URL + `/contatos/${id}`);
  }

  async getGrupos() {
    return await this.http.get<any>(this.URL + `/group`);
  }

  async fnGetGruposContato(id: number) {
    return await this.http.get<any>(this.URL + `/grupocontatos/${id}`);
  }

  async fnInsertContato(obj: any) {
    return await this.http.post(this.URL + `/contatos`, obj);
  }

  async fnEditarContato(obj: any, id: number) {
    return await this.http.put(this.URL + `/contatos/${id}`, obj);
  }

  async fnInsertContatoGrupo(obj: any) {
    return await this.http.post(this.URL + `/grupocontatos`, obj);
  }

  async fnEditaContatoGrupo(obj: any, idGrupo: number) {
    return await this.http.put(this.URL + `/grupocontatos/${idGrupo}`, obj);
  }

  async fnDeletaContatoGrupo(idGrupo: number) {
    return await this.http.delete(this.URL + `/grupocontatos/${idGrupo}`);
  }
}
