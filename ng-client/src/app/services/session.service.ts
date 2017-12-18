import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class SessionService {

  constructor( private http: Http) {}

    handleError(e){
      return Observable.throw(e.json().message);
    }

    logout(){
      return this.http.get(`/google`, {})
      .map(res => res.json())
      .catch(this.handleError);
    }

    login(){
      return this.http.get(`/google`, {})
      .map(res => res.json())
      .catch(this.handleError);
    }

    redirect() {
      return this.http.get(`/google/redirect`, {})
      .map(res => res.json())
      .catch(this.handleError);
    }



}
