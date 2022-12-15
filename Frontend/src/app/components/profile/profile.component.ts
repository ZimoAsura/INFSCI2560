import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {


    public title: string;
    public user: User;
    public status: string;
    public identity: User;
    public url: string;
    public token: string;
    public stats;

  constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
    ) {
        this.title = 'Profile';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

  ngOnInit() {
      console.log('Profile Component Working...');
      this.loadPage();
      console.log(this.user)
  }

  loadPage(){
      this._route.params.subscribe(params => {
         let id = params['id'];
         console.log(id)
         this.getUser(id);
         this.getCounters(id);
      });
  }

  getUser(userId){
    console.log("get user")
    this._userService.getUser(userId).subscribe(
      response => {
        console.log("receive user")
          if(response.data){
              this.user = response.data;
              console.log('profile',this.user);
          }else{
              this.status = 'error';
          }
      },
      error => {
          var errorMessage = <any>error;
          console.log(errorMessage);
          if(errorMessage != null){
              this.status = 'error';
              //In case an error, redirect to the profile page of current user
              this._router.navigate(['/profile', this.identity._id]);
          }
      }

    );
    }

    getCounters(userId){
        this._userService.getCounters(this.token, userId).subscribe(
            response => {
                this.stats = response;
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }
}
