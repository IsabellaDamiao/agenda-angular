import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

import { PhonePipe } from './pipes/phone.pipe';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    PhonePipe
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    PhonePipe
  ]
})
export class SharedModule { }
