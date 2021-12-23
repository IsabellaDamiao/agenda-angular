import { Contato } from './../model/contato';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, first, Observable, take} from 'rxjs';
import { environment } from './../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {


  baseUrl = environment.baseUrl;
  
  private readonly API = '/assets/contatos.json';

  constructor(private httpClient: HttpClient) {}

    lista(){
      return this.httpClient.get<Contato[]>(this.baseUrl).pipe(
        first(),
        delay(1000)
      );
    }

    loadByID(id: any){
      const url = `${this.baseUrl}/${id}`
      return this.httpClient.get<Contato>(url).pipe(take(1));
    }

    private create(contato: Contato): Observable<Contato> {
      return this.httpClient.post<Contato>(this.baseUrl, contato).pipe(take(1));
    }

    delete(id: any): Observable<void> {
      const url = `${this.baseUrl}/${id}`
      return this.httpClient.delete<void>(url);
    }

    private update(contato: Contato): Observable<Contato>{
      const url = `${this.baseUrl}/${contato.id}`
      return this.httpClient.put<Contato>(url, contato).pipe(take(1));
    }

    save(contato: Contato){
      if (contato.id) {
        return this.update(contato);
      } else {
        return this.create(contato);
      }
    }
}
