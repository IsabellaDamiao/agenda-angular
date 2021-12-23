import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatosComponent } from './contatos/contatos/contatos.component';
import { ContatoResolverGuard } from './contatos/contatos/guards/contato-resolver.guards';
import { FormComponent } from './contatos/form/form.component';


const routes: Routes = [
  { path: '', component: ContatosComponent },
  {
    path: 'new', component: FormComponent,
    resolve: {
      contato: ContatoResolverGuard
    }
  },
  {
    path: 'edit/:id', component: FormComponent,
    resolve: {
      contato: ContatoResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
