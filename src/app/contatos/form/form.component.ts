import { Contato } from './../model/contato';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatosService } from '../service/contatos.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { map, switchMap } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  sumitted: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private contatosService: ContatosService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

    const contato = this.route.snapshot.data['contato']

    this.form = this.fb.group({
      id: [contato.id],
      name: [contato.name, [Validators.required, Validators.minLength(2)]],
      surname: [contato.surname],
      phone: [contato.phone, [Validators.required]],
      favorito: [contato.favorito]
    });
  }

  onCancel() {
    this.sumitted = false;
    this.form.reset();
    this.location.back();
  }

  onSubmit(): void {
    this.sumitted = true;
    if (this.form.valid) {

      this.contatosService.save(this.form.value).subscribe((resposta) =>{
        if (resposta == null) {
          console.log(" com sucesso!");
          this.location.back();
        } else {
          console.log(" ao atualizar curso!");
          this.location.back();
        }
      });
    }
  }

}
