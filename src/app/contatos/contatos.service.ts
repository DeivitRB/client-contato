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
}
