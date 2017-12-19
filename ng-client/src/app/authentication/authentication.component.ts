import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  user: any;
  error: string;

  constructor(
    private session: SessionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  logout() {
    this.session.logout()
    .subscribe(
      () => this.user = null,
      (err) => this.error = err
    )
  }

  login() {
    this.session.login()
    .subscribe(
      (user) => this.successCb(user),
      (err) => this.errorCb(err)
    );
  }

errorCb(err) {
  this.error = err;
  this.user = null;
  }

  successCb(user) {
    this.user = user,
    this.error = null
  }
}
