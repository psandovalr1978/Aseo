import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarCasaPage } from './registrar-casa.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarCasaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarCasaPageRoutingModule {}
