import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from './services/global';
import { Title }  from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit{
  public title: string;
  public identity;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private titleService: Title
    ){
        this.title = 'Social Media';
        this.url = GLOBAL.url;
        this.titleService.setTitle( this.title );
    }
        
  ngOnInit(){
      //Call User Service to get user identity if available in global component
      this.identity = this._userService.getIdentity();
  }
        
  logout(){
        localStorage.clear();
        this.identity = null;
        this._router.navigate(['/']);
        
  }

}
