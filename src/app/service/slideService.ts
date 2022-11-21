import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalServicesService, Salida } from '../global-services.service';

export interface SlidePageModelo {
  img: string;
  titulo: string;
  subTitulo: string;
  descripcion: string;
}

export interface ProductListModelo {
  img: string;
  contenido: string;
  precio: number;
  nombre: string;

}

export interface ServicioAux {
  idServicio: number;
  nombre: string;
  descripcion: string;
  condiciones: string;
  excluciones: string;
  valor: number;
  urlImg: string;
}

@Injectable({providedIn: 'root'})
export class SlideServicio {
  constructor(private _http: HttpClient, private globalServicesService:GlobalServicesService) { }

  GetSlidePrueba(){
     return  this._http.get(`${this.globalServicesService.urlbase}/api/Promociones/GetSlider`)
  }

  GetServicios(){
    return  this._http.get(`${this.globalServicesService.urlbase}/api/Promociones/GetServicios`)
  }
}
