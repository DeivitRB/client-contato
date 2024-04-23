import { Component } from '@angular/core';
import { acessoService } from '../acesso.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  templateUrl: './acesso-component.html',
  styleUrls: ['./acesso-component.css'],
})
export class acessoComponent {

  iptNomeAcesso: string = ''

  constructor(private acessoServ: acessoService, private router: Router) {}

  fnAcessar() {
    if(this.iptNomeAcesso == '') {
      Swal.fire('Verifique!', 'Por favor informe seu nome para continuar.', 'warning')
      return
    }

    this.acessoServ.setNomeAcesso(this.iptNomeAcesso)

    this.router.navigate(['/gerenciamento-contatos-grupos']);
  }
}
