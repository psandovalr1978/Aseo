import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DireccionCliente, GlobalServicesService, Salida } from 'src/app/global-services.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioRegistrarCasaService {

  constructor(private _http: HttpClient, private globalServicesService:GlobalServicesService) {
   }

  GuardarDireccion(direccionCliente:DireccionCliente){

   return this._http.post<Salida>(`${this.globalServicesService.urlbase}/api/Direcciones/IngresarDirecionCliente`,direccionCliente);
  }
}
