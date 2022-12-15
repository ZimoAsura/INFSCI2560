import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

    public title: string;
    public user: User;
    public status: string = '';
    public identity;
    public token;
    public loginError: boolean = false;

  constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
    this.title = 'Login';
    this.user = new User("","","");
  }

  ngOnInit() {
      console.log('Login Component Working...')
  }


  onSubmit(){
      //User Login with data
      this._userService.signup(this.user).subscribe(
        response => {
          this.identity = response.data.user;
          console.log(response.data)
          if(!this.identity && !this.identity._id) {
            this.status == 'error';
            this.loginError = true;
          } else {
            localStorage.setItem('identity', JSON.stringify(this.identity));
            this.getToken();
          }
          this.status = 'success';
          }, error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
            if(errorMessage != null){
              this.status = 'error';
              this.loginError = true;
            }
          }
      );
  }

    getToken(){
        //User Login with data
      console.log(this.user)
      this._userService.signup(this.user, 'true').subscribe(
        response => {
          this.token = response.accessToken;
          if(this.token.length <= 0) {
            this.status == 'error';
          } else {
            localStorage.setItem('token', this.token);
            if (response.data.user.role == 'Admin')
            {
              this._router.navigate(['/admin']);
            } else {
              this.getCounters();
            }
            
          }
          this.status = 'success';
          }, error => {
            var errorMessage = <any>error;
            console.log(errorMessage);
            if(errorMessage != null){
              this.status = 'error';
            }
          }
      );
    }

    getCounters() {
      this._userService.getCounters(this.token, this.identity._id).subscribe(
          response => {
            localStorage.setItem('stats', JSON.stringify(response));
            this.status = 'success';
            this._router.navigate(['/']);
          },
          error => {
            var errorMessage = <any>error;
            console.log('login getCounter error',errorMessage);
            if(errorMessage != null){
              this.status = 'error';
            }
          }
      )
    }

    transitionEnd(e: Event) {
      this.loginError = false;
    }
}
