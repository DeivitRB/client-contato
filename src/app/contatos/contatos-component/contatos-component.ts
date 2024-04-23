import { Component, OnInit } from "@angular/core";
import { faFilter, faPlus, faTimes, faArrowUpWideShort, faArrowDownWideShort } from "@fortawesome/free-solid-svg-icons";
import { ContatosService } from "../contatos.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { filtroContatos } from "../interfaces";
import Swal from "sweetalert2";


@Component({
    templateUrl: './contatos-component.html',
    styleUrls: ['./contatos-component.css']
})

export class contatosComponent implements OnInit {
    faPlus = faPlus;
    faFilter = faFilter;
    faTimes = faTimes;
    faArrowUpWideShort = faArrowUpWideShort;
    faArrowDownWideShort = faArrowDownWideShort
  
    formFilter: FormGroup;
    formContatoGrupos: FormGroup
  
    listHeader: any = [
      {
        label: 'Código',
        prop: 'id',
        toggle: false
      },
      {
        label: 'Nome',
        prop: 'ds_contato',
        toggle: false
      },
      {
        label: 'E-mail',
        prop: 'ds_email',
        toggle: false
      },
      {
        label: 'Celular',
        prop: 'nr_celular',
        toggle: false
      },
      {
        label: 'Status',
        prop: 'st_ativo',
        toggle: false
      }
    ]
  
    listContatos: any[] = []
    page: number = 1
    pageSize: number = 15;
    showFilter: boolean = false;
    loadingInline: boolean = false;
    totalAtivos: number = 0;
    totalInativos: number = 0
    validMenuContatoGrupo: boolean = false
  
    constructor(private contatosServ: ContatosService, private fb: FormBuilder) {}
  
    ngOnInit() {
      this.fnInitForm()
      this.fnGetContatos()
    }
  
    fnInitForm(): void {
      this.formFilter = this.fb.group({
        slctStatus: ['99'],
        iptBuscar: ['']
      });

      this.formContatoGrupos = this.fb.group({
        iptNomeContato: [''],
        iptEmailContato: [''],
        iptCelularContato: [''],
        checkStatusContato: [true]
      })
    }
  
    async fnGetContatos() {
      this.totalAtivos = 0
      this.totalInativos = 0

      let objFiltro: filtroContatos = {
        status: this.formFilter.get('slctStatus').value,
        buscar: this.formFilter.get('iptBuscar').value
      };
  
      this.loadingInline = true;
      (await this.contatosServ.fnGetContatos(objFiltro)).subscribe((resp: any) => {
        this.listContatos = resp[0];

        this.listContatos.filter((fi: any) => {
            if(fi.st_ativo == 1) {
                this.totalAtivos += 1
            }

            if(fi.st_ativo == 0) {
                this.totalInativos += 1
            }
        })

        this.loadingInline = false;
      }, (err) => {
        Swal.fire('Ops!', 'Não foi possível carregar contatos.', 'error')
        this.loadingInline = false;
      })
    }

    sort(colName, toglee: boolean) {
        this.listContatos.sort(
          (a: any, b: any) => {
            if (toglee == false) {
              if (a[colName] < b[colName]) return -1;
              if (a[colName] > b[colName]) return 1;
              return 0;
            } else {
              if (a[colName] < b[colName]) return 1;
              if (a[colName] > b[colName]) return -1;
              return 0;
            }
          }
        );
    }
}