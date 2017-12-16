import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class RecipesService {
  BASE_URL: string = 'http://localhost:3000';

  constructor(private http: Http) { }

  getList() {
    return this.http.get(`${this.BASE_URL}/recipes`)
      .map((res) => res.json());
  }

  get(id) {
    var temp = this.http.get(`${this.BASE_URL}/recipes/${id}`)
      .map((res) => res.json());
      //console.log('RES = ', temp);
    return temp;
  }

  getEdit(id) {
    return this.http.get(`${this.BASE_URL}/recipes/${id}/edit`)
  }

  edit(recipe) {
    return this.http.put(`${this.BASE_URL}/recipes/${recipe.id}`, recipe)
    .map((res) => res.json());
  }

  // remove(id) {
  //     return this.http.delete(`${this.BASE_URL}/recipes/${id}`)
  //       .map((res) => res.json());
  //   }

remove(id) {
  return this.http.delete(`${this.BASE_URL}/recipes/${id}`)
    .map((res) => res.json());
}


}
