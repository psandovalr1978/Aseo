import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServicesService } from 'src/app/global-services.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  constructor(private globalServicesService:GlobalServicesService,private router: Router,) { }

  ngOnInit() {
    if(!this.globalServicesService.logeado){
      this.router.navigate(['/login']);
    }
  }

}