import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class SessionService {
  BASE_URL: string = 'http://localhost:3000';

  constructor( private http: Http) {}

  // getList() {
  //   return this.http.get(`${this.BASE_URL}/recipes`)
  //     .map((res) => res.json());
  // }

    handleError(e){
      return Observable.throw(e.json().message);
    }

    logout(){
      return this.http.get(`${this.BASE_URL}/auth/logout`, {})
      .map(res => res.json())
      .catch(this.handleError);
    }

    login(){
      return this.http.get(`${this.BASE_URL}/auth/google`, {})
      .map(res => res.json())
      .catch(this.handleError);
    }

    redirect() {
      return this.http.get(`${this.BASE_URL}/auth/google/redirect`, {})
      .map(res => res.json())
      .catch(this.handleError);
    }



}
