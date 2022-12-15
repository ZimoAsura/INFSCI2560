import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public identity;
  public token;
  public user;
  public url: string;
  public userList: any[];

  constructor(
    public _http: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
) {
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
}

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this._userService.getUsers(this.token).subscribe(
      response => {
        this.userList = response.data;
      } 
    )
  }

  deleteUser(id){
    console.log('hit delete')
    this._userService.deleteUser(id, this.token).subscribe(
      response => {
        console.log('receive delete')
        this.getUsers();
      },
      error => {
        console.log(error)
      }
    )
  }



}
