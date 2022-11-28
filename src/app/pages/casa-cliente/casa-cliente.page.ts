import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { DireccionCliente, GlobalServicesService } from 'src/app/global-services.service';
import { ServicioCasaClienteService } from './servicio-casa-cliente.service';

@Component({
  selector: 'app-casa-cliente',
  templateUrl: './casa-cliente.page.html',
  styleUrls: ['./casa-cliente.page.scss'],
})
export class CasaClientePage implements OnInit {


  public get ListaCasa(){
    return this.globalServicesService.ListaCasa;
  }  

  constructor(private globalServicesService:GlobalServicesService,private router: Router,
    private servicioCasaClienteService:ServicioCasaClienteService) { }

  ngOnInit() {
    if(!this.globalServicesService.logeado){
      this.router.navigate(['/login']);
    }
    this.getCasa()
  }

  getCasa(){
    if(this.globalServicesService.logeado){
      this.servicioCasaClienteService.GetCasas().pipe(
        tap((x:DireccionCliente[]) =>{
          this.globalServicesService.ListaCasa = x;
        })
      ).subscribe();
    }else{
      this.router.navigate(['/login']);
    }
  }
  handleRefresh(event:any){
    this.getCasa()
    event.target.complete()
  }
}
