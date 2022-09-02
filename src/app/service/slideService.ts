import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class  SlidePageModelo{
  img:string;
  titulo:string;
  subTitulo:string;
  descripcion:string;
}

@Injectable({providedIn: 'root'})
export class SlideServicio {
  constructor(private _http: HttpClient) { }

  GetSlidePrueba(){
    return  this._http.get<SlidePageModelo[]>('../../assets/data/sildeData.json');
  }

}
