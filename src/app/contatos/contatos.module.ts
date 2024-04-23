import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { contatosComponent } from './contatos-component/contatos-component';
import { statusPipe } from './status.pipe';
import { LoadingInlineModule } from '../loading-inline/loading-inline.module';


@NgModule({
  declarations: [contatosComponent, statusPipe],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    LoadingInlineModule
  ],
  providers: [],
})
export class ContatosModule {}
