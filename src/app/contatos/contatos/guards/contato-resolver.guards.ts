import { ContatosService } from './../../service/contatos.service';
import { Contato } from './../../model/contato';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ContatoResolverGuard implements Resolve<Contato>{

    constructor(private contatosService: ContatosService) { }
    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Contato | Observable<Contato> | Promise<Contato> {
        if(route.params && route.params['id']){
            return this.contatosService.loadByID(route.params['id']);
        }
        return of({
            id: '',
            name: '',
            surname: '',
            phone: '',
            favorito: false

        }) 
            

        
    }
}