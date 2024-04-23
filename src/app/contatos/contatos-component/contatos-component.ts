import { Component, OnInit } from '@angular/core';
import {
  faFilter,
  faPlus,
  faTimes,
  faArrowUpWideShort,
  faArrowDownWideShort,
  faAnglesRight,
  faAnglesLeft,
  faChevronLeft,
  faChevronRight,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { ContatosService } from '../contatos.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { filtroContatos } from '../interfaces';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

@Component({
  templateUrl: './contatos-component.html',
  styleUrls: ['./contatos-component.css'],
})
export class contatosComponent implements OnInit {
  faPlus = faPlus;
  faFilter = faFilter;
  faTimes = faTimes;
  faArrowUpWideShort = faArrowUpWideShort;
  faArrowDownWideShort = faArrowDownWideShort;
  faAnglesRight = faAnglesRight;
  faAnglesLeft = faAnglesLeft;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faList = faList;

  formFilter: FormGroup;
  formContatoGrupos: FormGroup;

  listHeader: any = [
    {
      label: 'Código',
      prop: 'id',
      toggle: false,
    },
    {
      label: 'Nome',
      prop: 'ds_contato',
      toggle: false,
    },
    {
      label: 'E-mail',
      prop: 'ds_email',
      toggle: false,
    },
    {
      label: 'Celular',
      prop: 'nr_celular',
      toggle: false,
    },
    {
      label: 'Status',
      prop: 'st_ativo',
      toggle: false,
    },
  ];

  listContatos: any[] = [];
  page: number = 1;
  pageSize: number = 15;
  showFilter: boolean = false;
  loadingInline: boolean = false;
  totalAtivos: number = 0;
  totalInativos: number = 0;
  validMenuContatoGrupo: boolean = false;
  listGrupos: any = [];
  listGruposContato: any = [];
  listGrupoContatoDeletado: any = [];
  loadingInlineSalvar: boolean = false;

  constructor(private contatosServ: ContatosService, private fb: FormBuilder) {}

  ngOnInit() {
    this.fnInitForm();
    this.fnGetGrupos();
    this.fnGetContatos();
  }

  fnInitForm(): void {
    this.formFilter = this.fb.group({
      slctStatus: ['99'],
      iptBuscar: [''],
    });

    this.formContatoGrupos = this.fb.group({
      iptNomeContato: ['', Validators.required],
      iptEmailContato: ['', Validators.required],
      iptCelularContato: ['', Validators.required],
      checkStatusContato: [true],
      idContato: [0],
    });
  }

  async fnGetGrupos() {
    (await this.contatosServ.getGrupos()).subscribe((resp: any) => {
      this.listGrupos = resp;
      this.listGrupos.map((el: any) => {
        el.showGrupo = true;
      });
      console.log(resp);
    });
  }

  async fnGetContatos() {
    this.totalAtivos = 0;
    this.totalInativos = 0;

    let objFiltro: filtroContatos = {
      status: this.formFilter.get('slctStatus').value,
      buscar: this.formFilter.get('iptBuscar').value,
    };

    this.loadingInline = true;
    (await this.contatosServ.fnGetContatos(objFiltro)).subscribe(
      (resp: any) => {
        this.listContatos = resp[0];

        this.listContatos.filter((fi: any) => {
          if (fi.st_ativo == 1) {
            this.totalAtivos += 1;
          }

          if (fi.st_ativo == 0) {
            this.totalInativos += 1;
          }
        });

        this.loadingInline = false;
      },
      (err) => {
        Swal.fire('Ops!', 'Não foi possível carregar contatos.', 'error');
        this.loadingInline = false;
      }
    );
  }

  sort(colName, toglee: boolean) {
    this.listContatos.sort((a: any, b: any) => {
      if (toglee == false) {
        if (a[colName] < b[colName]) return -1;
        if (a[colName] > b[colName]) return 1;
        return 0;
      } else {
        if (a[colName] < b[colName]) return 1;
        if (a[colName] > b[colName]) return -1;
        return 0;
      }
    });
  }

  fnResetFormContato() {
    this.listGruposContato = [];
    this.validMenuContatoGrupo = false;
    this.formContatoGrupos.patchValue({
      iptNomeContato: '',
      iptEmailContato: '',
      iptCelularContato: '',
      checkStatusContato: true,
      idContato: 0,
    });
  }

  async fnGetDadosContato(objContato: any) {
    (await this.contatosServ.fnGetContato(objContato.id)).subscribe(
      (resp: any) => {
        this.formContatoGrupos.patchValue({
          iptNomeContato: resp.dsContato,
          iptEmailContato: resp.dsEmail,
          iptCelularContato: resp.nrCelular,
          checkStatusContato: resp.stAtivo == 1 ? true : false,
          idContato: resp.id,
        });

        this.fnGetGruposContato(objContato.id);
      },
      (err) => {
        Swal.fire(
          'Ops!',
          'Não foi possível carregar informações do contato.',
          'error'
        );
      }
    );
  }

  async fnGetGruposContato(idContato: number) {
    (await this.contatosServ.fnGetGruposContato(idContato)).subscribe(
      (resp: any) => {
        this.listGruposContato = resp[0];

        if (this.listGruposContato.length > 0) {
          this.listGruposContato.filter((fi: any) => {
            this.listGrupos.map((fiG: any) => {
              if (fi.grupocontato_id == fiG.id) {
                fiG.showGrupo = false;
              }
            });
          });
        }
      }
    );
  }

  fnInserirGrupoContato(itemGrupo: any, i: number) {
    if (itemGrupo.stAtivo == 0) {
      Swal.fire('Ops!', 'Não é permitido inserir grupo inativo.', 'warning');
      return;
    }

    let objGrupoContato = {
      contato_id: 0,
      grupocontato_id: itemGrupo.id,
      ds_grupocontato: itemGrupo.dsGrupocontato,
    };
    this.listGruposContato.push(objGrupoContato);

    this.listGrupos[i].showGrupo = false;
  }

  fnInserirTodos() {
    this.listGrupos.map((el: any) => {
      if (el.stAtivo == 1) {
        el.showGrupo = false;

        let objGrupoContato = {
          contato_id: 0,
          grupocontato_id: el.id,
          ds_grupocontato: el.dsGrupocontato,
        };
        this.listGruposContato.push(objGrupoContato);
      }
    });
  }

  fnRetirarTodosGrupos() {
    this.listGrupos.filter((el: any) => {
      el.showGrupo = true;
    });

    this.listGruposContato.filter((fi: any) => {
      if (fi.id != undefined) {
        this.listGrupoContatoDeletado.push(fi);
      }
    });

    this.listGruposContato = [];
  }

  fnRetirarGrupodeContato(itemGrupo: any, i: number) {
    this.listGrupos.filter((el: any) => {
      if (itemGrupo.grupocontato_id == el.id) {
        el.showGrupo = true;
      }
    });

    if (itemGrupo.id != undefined) {
      this.listGrupoContatoDeletado.push(itemGrupo);
    }

    this.listGruposContato.splice(i, 1);
  }

  async fnSalvaContato() {
    let objContato: any = {
      dsContato: this.formContatoGrupos.get('iptNomeContato').value,
      nrCelular: this.formContatoGrupos.get('iptCelularContato').value,
      dsEmail: this.formContatoGrupos.get('iptEmailContato').value,
      stAtivo:
        this.formContatoGrupos.get('checkStatusContato').value == true ? 1 : 0,
    };

    let idContato = Number(this.formContatoGrupos.get('idContato').value);

    if (this.formContatoGrupos.invalid) {
      Swal.fire(
        'Verifique!',
        'Existe campo obrigatórios não preenchidos.',
        'warning'
      );
      return;
    }

    this.loadingInlineSalvar = true;

    if (idContato == 0) {
      (await this.contatosServ.fnInsertContato(objContato)).subscribe(
        (resp: any) => {
          if (this.listGruposContato.length > 0) {
            this.fnSalvaGrupoContato(resp.id);
          }

          this.loadingInlineSalvar = false;
          Swal.fire(
            'Sucesso!',
            `Contato: ${objContato.dsContato} salvo.`,
            'success'
          );

          this.fnGetContatos();
          this.fnResetFormContato();
        },
        (err) => {
          Swal.fire('Ops!', 'Não foi possível salvar contato.', 'error');
        }
      );
    } else {
      (
        await this.contatosServ.fnEditarContato(objContato, idContato)
      ).subscribe(
        (resp: any) => {
          if (this.listGruposContato.length > 0) {
            this.fnSalvaGrupoContato(idContato);
          }

          if (this.listGrupoContatoDeletado.length > 0) {
            this.fnDeletaGrupoDoContato();
          }

          Swal.fire(
            'Sucesso!',
            `Contato: ${objContato.dsContato} editado.`,
            'success'
          );
          this.loadingInlineSalvar = false;
          this.fnGetContatos();
          this.fnResetFormContato();
        },
        (err) => {
          Swal.fire('Ops!', 'Não foi possível editar contato.', 'error');
        }
      );
    }
  }

  async fnSalvaGrupoContato(idContato: number) {
    await this.listGruposContato.filter(async (fi: any) => {
      let obj: any = {
        contatoId: idContato,
        grupocontatoId: fi.grupocontato_id,
      };

      if (fi.id == undefined) {
        (await this.contatosServ.fnInsertContatoGrupo(obj)).subscribe(
          (resp: any) => {}
        );
      } else {
        (await this.contatosServ.fnEditaContatoGrupo(obj, fi.id)).subscribe(
          (resp: any) => {}
        );
      }
    });
  }

  async fnDeletaGrupoDoContato() {
    await this.listGrupoContatoDeletado.filter(async (fi: any) => {
      (await this.contatosServ.fnDeletaContatoGrupo(fi.id)).subscribe(
        (resp: any) => {}
      );
    });
  }
}
