import { DatosCliente, GlobalServicesService, Login, Salida } from 'src/app/global-services.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoginService } from './login-service.service';
import {catchError, tap} from "rxjs/operators"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  get mail() { return this.formulario.get('mail')!; }

  get pass() { return this.formulario.get('pass')!; }

  formulario:FormGroup;
  constructor( 
    private router: Router,
    private alertController: AlertController,
    private globalServicesService:GlobalServicesService,
    private serviceLogin:LoginService,
    
    ) { }

  ngOnInit() {
    this.formulario = new FormGroup({
      mail: new FormControl('',[Validators.required, Validators.email]),
      pass: new FormControl('',[Validators.required, Validators.maxLength(10), Validators.minLength(6)])
    });
  }

 login(){
    const l = new Login()
    l.mail = this.mail.value;
    l.pass = this.pass.value;

   this.serviceLogin.LoginUsr(l).pipe(
      tap((x:Salida)=>{
          if(x.estado){
            this.globalServicesService.logeado = x.estado;
            this.globalServicesService.cliente = (x.data as DatosCliente);
            this.globalServicesService.ConsultaCarrito();
            this.router.navigate(['/inicio']);
          }
          else{
            this.globalServicesService.logeado = x.estado;
            this.alertaLogin(x.mensaje);
          }
      }),
      catchError((x) => {
        this.alertaLogin(x.statusText);
        return x;
      })
    ).subscribe();

  }



  async alertaLogin(mensaje:string){
    const alert = await this.alertController.create({
      header: 'Atención',
      subHeader: '',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
}


