import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  providers: [UserService, PostService, ToastrService]
})
export class SidebarComponent implements OnInit {

  public identity;
  public token;
  public stats;
  public url;
  public status;
  public post;

  constructor(
        private _userService: UserService,
        private _postService: PostService,
        private _route: ActivatedRoute,
        private _router: Router,
        private toastr: ToastrService
    ) {
        this.identity = this._userService.getIdentity();
        console.log(this.identity);
        this.token = this._userService.getToken();
        this.stats;
        this.url = GLOBAL.url;
        this.post = new Post('', '', '', '', this.identity._id);
    }

  ngOnInit() {
      console.log("Sidebar Compent Working...");
      this.identity = this._userService.getIdentity();
      console.log(this.identity)
      this.stats = this.getCounters(this.identity._id);
  }

  onSubmit(form, $event){
      this._postService.addPost(this.token, this.post).subscribe(
        response => {
            if(response.post){
                this.toastr.success('Posted correctly');
                this.getCounters(this.identity._id);
                form.reset();
                this._router.navigate(['/timeline']);
                this.sent.emit({send: 'true'});
               } else {
				          this.toastr.error('Not posted.');
               }
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

  //Output, Make the event available for the parent component
  @Output() sent = new EventEmitter();

  getCounters(userid){
    // console.log('sidebar')
    // console.log(this.token, this.identity._id)
    this._userService.getCounters(this.token, userid).subscribe(
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
