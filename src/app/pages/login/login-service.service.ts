import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatosCliente, GlobalServicesService, Login, Salida } from 'src/app/global-services.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient, private globalServicesService:GlobalServicesService) 
  {  }

  LoginUsr(login:Login) {
    const url = `${this.globalServicesService.urlbase}/api/Clientes/Login`;
    return this._http.post<Salida>(url,login);
  }
}
