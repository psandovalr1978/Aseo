import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServicesService, ListaComunas } from 'src/app/global-services.service';
import { FormControl, FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
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
  constructor(private globalServicesService:GlobalServicesService,private router: Router,private toastController: ToastController) { }

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
    const toast = await this.toastController.create({
      message: 'Domicilio Guardado',
      duration: 1500,
      position: 'bottom'
    });
  }

}
