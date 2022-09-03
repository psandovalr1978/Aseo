import { Component, OnInit } from '@angular/core';
import { SlidePageModelo, SlideServicio } from './service/slideService';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 900,
    startAutoplay:true,
  };
  slide:SlidePageModelo[];
  constructor(private slideService:SlideServicio) {
  }
  ngOnInit(): void {
    this.slideService.GetSlidePrueba().subscribe((x:SlidePageModelo[])=> {
      this.slide = x
    });
  }


}
