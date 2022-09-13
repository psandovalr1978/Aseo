
import { Component, OnInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductListModelo, SlidePageModelo, SlideServicio } from 'src/app/service/slideService';


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

  listProd:ProductListModelo[];

  constructor(private slideService:SlideServicio) { }

  ngOnInit(): void {
    this.slideService.GetSlidePrueba().subscribe((x:SlidePageModelo[])=> {
      this.slide = x
    });
    this.slideService.GetListPrueba().subscribe((x:ProductListModelo[])=>{
      this.listProd= x;
    })
  }

}
