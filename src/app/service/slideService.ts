import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface  SlidePageModelo{
  img:string;
  titulo:string;
  subTitulo:string;
  descripcion:string;
}

export interface  ProductListModelo{
  img:string;
  contenido:string;
  precio:number;
  nombre:string;

}


@Injectable({providedIn: 'root'})
export class SlideServicio {
  constructor(private _http: HttpClient) { }

  GetSlidePrueba(){
    return  this._http.get<SlidePageModelo[]>('../../assets/data/sildeData.json');
  }

  GetListPrueba(){
    return this._http.get<ProductListModelo[]>('../../assets/data/listData.json');
  }
}
