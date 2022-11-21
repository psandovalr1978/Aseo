
import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConsultaCarrito, GlobalServicesService } from 'src/app/global-services.service';
import { ProductListModelo, ServicioAux, SlidePageModelo, SlideServicio } from 'src/app/service/slideService';
import {catchError, tap} from "rxjs/operators"
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {


  slideOpts = {
    initialSlide: 0,
    speed: 900,
    startAutoplay:true,
  };
  slide:SlidePageModelo[];

  listServicios:ServicioAux[];

  constructor(private slideService:SlideServicio, private globalServicesService:GlobalServicesService,private alertController: AlertController) { }


  public get usuario()
  {
    return  `Hola!! ${this.globalServicesService.cliente.nombre}`;
  }

  async ngOnInit(): Promise<void> {

    this.slideService.GetSlidePrueba().pipe(
      tap((x: any) => {
        this.slide = (x.data as SlidePageModelo[]);
      }),
      catchError((x) => {
        console.log({ x });
        this.presentAlert();
        return x;
      })
    ).subscribe();

    this.slideService.GetServicios().pipe(
      tap((x: any) => {
        this.listServicios = (x.data as ServicioAux[])
      }),
      catchError((x) => {
        console.log({ x })
        this.presentAlert();
        return x
      })
    ).subscribe();

    

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Atención',
      message: 'No se pueden cargar los servicios.',
      buttons: ['OK'],
    });

    await alert.present();
  }

  addServicio(id:number){

  }
}
