import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServicesService } from 'src/app/global-services.service';

@Component({
  selector: 'app-casa-cliente',
  templateUrl: './casa-cliente.page.html',
  styleUrls: ['./casa-cliente.page.scss'],
})
export class CasaClientePage implements OnInit {

  constructor(private globalServicesService:GlobalServicesService,private router: Router,) { }

  ngOnInit() {
    if(!this.globalServicesService.logeado){
      this.router.navigate(['/login']);
    }
  }

}
