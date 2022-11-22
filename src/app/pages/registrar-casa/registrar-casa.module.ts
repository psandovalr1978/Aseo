import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule, FormBuilder, FormControl,FormGroup } from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { RegistrarCasaPageRoutingModule } from './registrar-casa-routing.module';

import { RegistrarCasaPage } from './registrar-casa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrarCasaPageRoutingModule
  ],
  declarations: [RegistrarCasaPage]
})
export class RegistrarCasaPageModule {}
