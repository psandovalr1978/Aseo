import { ServicioAux } from 'src/app/service/slideService';
import { CarritoCompra } from './../global-services.service';
import { Salida } from 'src/app/global-services.service';
import { Injectable } from '@angular/core';
import { GlobalServicesService } from '../global-services.service';
import { HttpClient } from '@angular/common/http';
import {catchError, tap} from "rxjs/operators"



@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private _http: HttpClient,private globalServicesService:GlobalServicesService) { }

  getServicio(id:number){
   return this._http.get(`${this.globalServicesService.urlbase}/api/promosiones/GetServicios/${id}`);
  }

  servicioAdd( idServicio: number) 
  {
     let s = new Salida();
     if(!this.globalServicesService.logeado)
      {
        s.estado = false;
        s.mensaje = "Debe estar logeado"
        return s;
      }
      
      this.getServicio(idServicio).pipe(
        tap((x:any) =>{
          s = (x as Salida);
          if(!s.estado)
            return s;
          const servicioAux = (s.data as ServicioAux)
          const carrito = new CarritoCompra();
          carrito.id = servicioAux.idServicio;
          carrito.fechaHora =new Date(Date.now.toString());
          carrito.idUsuario = this.globalServicesService.cliente.rut;
          carrito.nomProducto = servicioAux.nombre;
          carrito.valor = servicioAux.valor;
          this.globalServicesService.listaCarrito.push(carrito);
          
        return s;
        }),
        catchError((x) =>{
          return x;
        })
      ).subscribe();
  }


}
