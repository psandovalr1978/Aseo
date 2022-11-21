import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ECHILD } from 'constants';
import {catchError, tap} from "rxjs/operators"
import { DatosCliente, GlobalServicesService, IngresoCliente, ListaComunas, Salida } from 'src/app/global-services.service';
import { RegistroServiceService } from './registro.service.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  get mail() { return this.formulario.get('mail'); }

  get rut() { return this.formulario.get('rut'); }

  get nombre() { return this.formulario.get('nombre')!; }

  get apellidos() { return this.formulario.get('apellidos')!; }

  get telefono() { return this.formulario.get('telefono')!; }

  get idComuna() { return this.formulario.get('idComuna')!; }

  get direccionCliente() { return this.formulario.get('direccionCliente')!; }

  get pass() { return this.formulario.get('pass')!; }

  listaComunas:ListaComunas[];

  formulario:FormGroup;
  constructor(private registroServiceService: RegistroServiceService,private globalServicesService:GlobalServicesService,private alertController: AlertController,private router: Router,) { }

  ngOnInit() {
    this.formulario = new FormGroup({
      mail: new FormControl('',[Validators.required, Validators.email]),
      rut: new FormControl('',[Validators.required, Validators.maxLength(11)]),
      pass: new FormControl('',[Validators.required, Validators.maxLength(10), Validators.minLength(6)]),
      nombre: new FormControl('',[Validators.required, Validators.maxLength(20), Validators.minLength(3)]),
      apellidos :new FormControl('',[Validators.required, Validators.maxLength(20), Validators.minLength(4)]),
      telefono:new FormControl('',[Validators.required, Validators.maxLength(10)]),
      idComuna:new FormControl('',[Validators.required]),
      direccionCliente: new FormControl('',[Validators.required, Validators.maxLength(50)]),
    });

    this.globalServicesService.getComuna().pipe(
      tap((x:ListaComunas[])=>{
        this.listaComunas = x;
      }),
    ).subscribe();
    
  }
  registrar(){
    const reg = new IngresoCliente()
    reg.rut = this.rut.value;
    reg.mail = this.mail.value;
    reg.nombre = this.nombre.value;
    reg.apellidos = this.apellidos.value;
    reg.idComuna = this.idComuna.value;
    reg.telefono = this.telefono.value;
    reg.direccionCliente = this.direccionCliente.value;
    reg.pass = this.pass.value;

    this.registroServiceService.AddRegistrousuario(reg).pipe(
      tap((x:Salida) => {
        if(x.estado){
          this.alertaRegistro(x.mensaje);
          this.globalServicesService.logeado = x.estado;
          this.globalServicesService.cliente = (x.data as DatosCliente);
          this.router.navigate(['/inicio']);
        }
        else{
          this.alertaRegistro(x.mensaje);
        }
      }),
      catchError((x) => {
        this.alertaRegistro(x.statusText);
        return x;
      })
    ).subscribe();
  }

  async alertaRegistro(mensaje:string){
    const alert = await this.alertController.create({
      header: 'Atención',
      subHeader: '',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
