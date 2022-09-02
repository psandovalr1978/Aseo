import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface PostsModelo
{
  userId:number;
  id:number;
  title:string;
  body:string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  GetData(){
    return this.httpClient.get<PostsModelo[]>('https://jsonplaceholder.typicode.com/posts');
  }

}
