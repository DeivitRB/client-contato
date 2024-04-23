import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";


@Injectable({
    providedIn: 'root',
})

export class acessoService {
    public nomeAcesso = new BehaviorSubject<any>(null);

    constructor(private router: Router) {
        this.userObservale()
    }

    setNomeAcesso(nome: string) {
        window.localStorage.setItem(
            'nomeUser',
            nome
        );
        
        this.userObservale();
    }

    userObservale() {
        let objusuario = window.localStorage.getItem('nomeUser')

        this.nomeAcesso.next(objusuario);
    }

    getNomeacesso() {
        return this.nomeAcesso.asObservable();
    }

    fnLogout() {
        window.localStorage.removeItem('nomeUser')
        this.router.navigate(['']);
    }

    
}