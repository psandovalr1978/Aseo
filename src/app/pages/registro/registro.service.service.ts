import { PostService } from './../../service/post.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalServicesService, IngresoCliente, Salida } from 'src/app/global-services.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroServiceService {

  constructor(private _http: HttpClient, private globalServicesService:GlobalServicesService) { }

  AddRegistrousuario(cliente:IngresoCliente){
    const url = `${this.globalServicesService.urlbase}/api/Clientes/IngresarCliente`;
    return this._http.post<Salida>(url,cliente);
  }
}
