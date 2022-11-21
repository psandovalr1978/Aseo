import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasaClientePage } from './casa-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: CasaClientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasaClientePageRoutingModule {}
