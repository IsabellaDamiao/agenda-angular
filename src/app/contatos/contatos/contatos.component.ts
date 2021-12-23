import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Contato } from './../model/contato';
import { ContatosService } from './../service/contatos.service';




@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent {

  contatos$: Observable<Contato[]> | undefined;
  displayedColumns = ['name', 'surname', 'phone', 'acoes']; // definindo pela interface contatos.ts

  constructor(private contatoService: ContatosService,
    public dialog: MatDialog, private  router: Router,
    private route: ActivatedRoute) { //public _snackBar: MatSnackBar)
      this.findAll();
   }

   findAll() {
    this.contatos$ = this.contatoService.lista().pipe(
      catchError(error => {
        this.onError('Erro ao carregar contatos!');
        return of([])
      })
    );
  }

   onDelete(id: any): void {
    this.contatoService.delete(id).subscribe((resposta) => {
      if (resposta == null) {
        //this.openSnack('Contato deletado com sucesso!');
        this.findAll();
      }
    })
  }

  onStatusFav(contato: Contato): void {
    contato.favorito = !contato.favorito;
    console.log(contato)
    this.contatoService.save(contato).subscribe((resposta) =>{
    //this.contatoService.update(contato).subscribe((resposta) => {
      if (resposta != null && contato.favorito) {
        //this.openSnack('Contato favoritado com sucesso!');
        this.findAll();
      } else if (resposta != null && !contato.favorito) {
       // this.openSnack('Contato desfavoritado com sucesso!');
        this.findAll();
      }
    });
  }

   onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent,{
      data: errorMsg});
  }

  onEdit(id: any): void{
    this.router.navigate(['edit', id]), { relativeTo: this.router };
  }

  
}
