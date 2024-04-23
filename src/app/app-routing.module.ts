import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { contatosComponent } from './contatos/contatos-component/contatos-component';
import { acessoComponent } from './acesso/acesso-component/acesso-component';

const routes: Routes = [
  {
    path: '',
    component: acessoComponent,
  },
  {
    path: 'gerenciamento-contatos-grupos',
    component: contatosComponent,
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
