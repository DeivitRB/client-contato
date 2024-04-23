import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoadingInlineModule } from '../loading-inline/loading-inline.module';
import { NgxMaskModule } from 'ngx-mask';
import { acessoComponent } from './acesso-component/acesso-component';

@NgModule({
  declarations: [acessoComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    LoadingInlineModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [],
})
export class AcessoModule {}
