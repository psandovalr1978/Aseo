import { HttpClient } from '@angular/common/http';
import { LoginPage } from './pages/login/login.page';
import { Injectable } from '@angular/core';
import { runInThisContext } from 'vm';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export class Login
{
  mail:string;
  pass:string;
}

export class ListaComunas
{
   id :number;
   nombre :string
}
export class Salida
{
 estado:boolean;
 mensaje:string;
 data:object;
}
export class DatosCliente
{
    rut:string;
    nombre:string;
    apellidos:string; 
    telefono :string;
    mail :string;
    direccionCliente:string; 
}

export class CarritoCompra
{
  id:number;
  idUsuario:string;
  nomProducto:string;
  fechaHora: Date;
  valor:number;
}

export class ConsultaCarrito 
{
  rut:string;
  mail:string;
}

export class IngresoCliente
{
    rut:string
    mail :string
    pass :string
    nombre :string
    apellidos :string
    telefono :string
    idComuna :number
    direccionCliente :string
}

export class DireccionCliente {
  id: number;
  rut: string
  mail: string
  nombre: string
  regionComuna: string
  direccion: string
  idComuna: number;
  nroHabitacion: number
  metroC: number;
  cometario: string
  pisos: number;
}
@Injectable({
  providedIn: 'root'
})
export class GlobalServicesService {
  private _cliente:DatosCliente;
  private _logeado:boolean;
  private _hrlBase:string = "http://localhost:64128"; 
  private _listaCarrito:CarritoCompra[]
  private _datosCliente:DatosCliente;
  private _cantidadCarrito:number = 0;
  private _listaCasa:DireccionCliente[] = [];

  constructor(private _http: HttpClient) {
    this.logeado = false;
    this.cliente = new DatosCliente();
    this.cliente.nombre = "";
   }

  public get ListaCasa(){
    return this._listaCasa;
  }
  public set ListaCasa(value:DireccionCliente[]){
    this._listaCasa = value;
  }
  public get logeado()
  {
    return this._logeado;
  }
  public set logeado(value:boolean)
  {
    this._logeado= value;
  }
  public get urlbase()
  {
    return this._hrlBase;
  }
  public get listaCarrito(){
    return this._listaCarrito
  }
  public set listaCarrito(value:CarritoCompra[]){
      this._listaCarrito = value;
  }
  public get cliente(){
      return this._cliente
  }
  public set cliente(value:DatosCliente){
    this._cliente = value;
  }

  public get cantidadCarrito(){
    
    return this._cantidadCarrito;
  }

  public set cantidadCarrito(cant:number){
    this._cantidadCarrito = cant;
  }


  ConsultaCarrito(){
      const consulta = new ConsultaCarrito();
      consulta.mail = this.cliente.mail;
      consulta.rut = this.cliente.rut;
      this.getCantidadCarrito(consulta).pipe(
        tap((x:number)=>{
          this.cantidadCarrito = x;
        })
      ).subscribe();
  
  }

  getComuna(){
    return this._http.get(`${this._hrlBase}/api/Servicios/GetComunas`);
  }

  getCantidadCarrito(consultaCarrito:ConsultaCarrito){
    return this._http.post<number>(`${this._hrlBase}/api/Servicios/GetCantArticuloCarrito`,consultaCarrito);
  }

 
}
