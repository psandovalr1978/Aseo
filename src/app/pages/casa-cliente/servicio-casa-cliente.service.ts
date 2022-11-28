import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DireccionCliente, GlobalServicesService } from 'src/app/global-services.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioCasaClienteService {

  constructor(private _http: HttpClient, private globalServicesService:GlobalServicesService) { }


  GetCasas(){
    return this._http.get<DireccionCliente[]>(`${this.globalServicesService.urlbase}/api/Direcciones/ListarDireccionCliente/${this.globalServicesService.cliente.rut}`)
  }
}
