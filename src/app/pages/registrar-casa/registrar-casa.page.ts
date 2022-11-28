import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DireccionCliente, GlobalServicesService, ListaComunas, Salida } from 'src/app/global-services.service';
import { FormControl, FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { ServicioRegistrarCasaService } from './servicio-registrar-casa.service';
import { Alert } from 'selenium-webdriver';
import { ServicioCasaClienteService } from '../casa-cliente/servicio-casa-cliente.service';
@Component({
  selector: 'app-registrar-casa',
  templateUrl: './registrar-casa.page.html',
  styleUrls: ['./registrar-casa.page.scss'],
})
export class RegistrarCasaPage implements OnInit {
 
  get nombre() { return this.formulario.get('nombre')!; }
  get direccion() { return this.formulario.get('direccion')!; }
  get idComuna() { return this.formulario.get('idComuna')!; }
  get nroHabitacion() { return this.formulario.get('nroHabitacion')!; }
  get metroC() { return this.formulario.get('metroC')!; }
  get cometario() { return this.formulario.get('cometario')!; }
  get pisos() { return this.formulario.get('pisos')!; }
  formulario:FormGroup;
  listaComunas:ListaComunas[];
  constructor(private globalServicesService:GlobalServicesService,private router: Router,private toastController: ToastController, 
    private servicioRegistrarCasaService:ServicioRegistrarCasaService,private servicioCasaClienteService:ServicioCasaClienteService) { }

  ngOnInit() {
    // if(!this.globalServicesService.logeado){
    //   this.router.navigate(['/login']);
    // }
    this.formulario = new FormGroup({
      
      nombre: new FormControl('',[Validators.required, ]),
      direccion: new FormControl('',[Validators.required,]),
      idComuna: new FormControl('',[Validators.required,]),
      nroHabitacion: new FormControl('',[Validators.required,Validators.maxLength(2)]),
      metroC: new FormControl('',[Validators.required,Validators.maxLength(3)]),
      cometario: new FormControl(''),
      pisos: new FormControl('',[Validators.required,Validators.maxLength(2)]),
    });

    this.globalServicesService.getComuna().pipe(
      tap((x:ListaComunas[])=>{
        this.listaComunas = x;
      }),
    ).subscribe();
  }

  async guardar(){

    const dire = new DireccionCliente();
    dire.idComuna = this.idComuna.value;
    dire.mail = this.globalServicesService.cliente.mail;
    dire.rut = this.globalServicesService.cliente.rut;
    dire.nombre = this.nombre.value;
    dire.direccion = this.direccion.value;
    dire.metroC = this.metroC.value;
    dire.cometario = this.cometario.value;
    dire.pisos = this.pisos.value;
    dire.nroHabitacion = this.nroHabitacion.value;

    this.servicioRegistrarCasaService.GuardarDireccion(dire).pipe(
      tap(async (x:Salida)=>{
        if(x.estado){
          this.servicioCasaClienteService.GetCasas().pipe(
            tap((x:DireccionCliente[]) =>{
              this.globalServicesService.ListaCasa = x;
            })
          ).subscribe();
          const toast = await this.toastController.create({
            message: x.mensaje,
            duration: 1500,
            position: 'bottom'
          });
          this.router.navigate(['/casa-cliente']);
        }
      }),
      catchError((x:any)=>{
        alert('Error al guardar')
        return x;
      })
    ).subscribe();

    
  }

}
