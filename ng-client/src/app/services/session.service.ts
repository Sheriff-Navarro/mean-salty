import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SessionService {
  // BASE_URL: string = 'http://localhost:3000';

  constructor( private http: Http) {}

handleError(err) {
  console.log("error handler")
  return Observable.throw(err.json().message);
}

signup(user) {
  return this.http.post(`/auth/signup`, user)
  .map(res => res.json())
  .catch(this.handleError);
}


login(user) {
  return this.http.post(`/auth/login`, user)
  .map(res => res.json())
  .catch(this.handleError);
}

logout() {
  return this.http.post(`/logout`, {})
  .map(res => res.json())
  .catch(this.handleError);
}

isLoggedIn() {
  return this.http.get(`/loggedin`)
  .map(res => res.json())
  .catch(this.handleError);
}

getPrivateData() {
  return this.http.get(`/private`)
  .map(res => res.json())
  .catch(this.handleError)
}







}
