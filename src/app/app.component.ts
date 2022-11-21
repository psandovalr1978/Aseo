import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GlobalServicesService } from './global-services.service';
import {  ProductListModelo, SlidePageModelo, SlideServicio } from './service/slideService';
import {tap} from "rxjs/operators"
import { Router, Routes } from '@angular/router';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  get cantidad(){
    return this.globalServicesService.cantidadCarrito;
  }

  constructor(private globalServicesService:GlobalServicesService, private router: Router) {
  }
  ngOnInit(): void {
  }

  validarSesionUsuario(){
    if(this.globalServicesService.logeado){
      this.router.navigate(['/login']);
    }
  }

}
