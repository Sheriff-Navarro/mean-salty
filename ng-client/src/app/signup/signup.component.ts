import { Component, OnInit } from '@angular/core';
import { SessionService } from "../services/session.service";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SessionService]
})
export class SignupComponent implements OnInit {

  formInfo = {
    username: '',
    password: '',
    fullName: ''
    
  }

  user: any;
  error: string;

  constructor( private session: SessionService ) { }

  ngOnInit() {
  }

  signup() {
    this.session.signup(this.formInfo)
    .subscribe(
      (user) => this.user = user,
      (err) => this.error = err
    );
  }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }

}
