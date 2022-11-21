import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServicesService } from 'src/app/global-services.service';

@Component({
  selector: 'app-registrar-casa',
  templateUrl: './registrar-casa.page.html',
  styleUrls: ['./registrar-casa.page.scss'],
})
export class RegistrarCasaPage implements OnInit {

  constructor(private globalServicesService:GlobalServicesService,private router: Router,) { }

  ngOnInit() {
    if(!this.globalServicesService.logeado){
      this.router.navigate(['/login']);
    }
  }

}
