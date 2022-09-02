import { Component, OnInit } from '@angular/core';
import { PostService, PostsModelo } from '../service/post.service';


@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})

export class TestPage implements OnInit {

  posteos:PostsModelo[]

  constructor(private dataService:PostService) { }

  ngOnInit() {
    this.GetDatosPosts();
  }

  GetDatosPosts(){
    this.dataService.GetData().subscribe((x:PostsModelo[])=>{
      this.posteos = x;
    })

  }


}
