import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasaClientePageRoutingModule } from './casa-cliente-routing.module';

import { CasaClientePage } from './casa-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasaClientePageRoutingModule
  ],
  declarations: [CasaClientePage]
})
export class CasaClientePageModule {}
