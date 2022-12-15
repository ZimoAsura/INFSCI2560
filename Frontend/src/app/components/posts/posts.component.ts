import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { Like } from '../../models/like';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { LikeService } from '../../services/like.service';
import { GLOBAL } from '../../services/global';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  providers: [UserService, PostService, LikeService]
})
export class PostsComponent implements OnInit, OnChanges {

  public title: string;
  public identity;
  public token;
  public url: string;
  public status: string;
  public posts: any[];
  // public noMore = false;
  public likes: any[];
  public liked: boolean;
  @Input() user: string;

  constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _postService: PostService,
        private _likeService: LikeService
    ) {

        this.title = 'Posts';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

  ngOnInit() {
    console.log("PostsComponent Working...");
    this.getPosts(this.user);
  }

  ngOnChanges(){
    this.getPosts(this.user);
  }

  getPosts(user){
    console.log("get posts", user)
    this._postService.getPostUser(this.token, user).subscribe(
      response => {
        if(response.posts){
          this.posts = response.posts;
          this.updateLikes();
        } else {
          this.status = 'error';
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status == 'error';
        }
      }
    );
  }

  updateLikes(){
    this.posts.forEach((post, index) => {
      let likes = this.getLikes(this.posts[index]._id)
                      .then((value) => {
                        this.likes = [].concat(value);

                        Object.defineProperty(this.posts[index], 'likes', {
                          value: this.likes,
                          writable: true
                        });

                        Object.defineProperty(this.posts[index], 'liked', {
                          value: false,
                          writable: true
                        });
                        
                        // show liked posts
                        this.likes.forEach((like) => {
                          if(like.user == this.identity._id) {
                            this.posts[index].liked = true;
                          }
                        });

                      }).catch(error => console.log(error));
      });
  }

  doLike(post, event: any) {
    if(post.liked){
      event.target.src = '../../../assets/images/empty-heart.png';
      this.removeLike(post._id);
    }
    else if(!post.liked) {
      event.target.src = '../../../assets/images/liked-heart.png';
      this.addLike(post._id);
    }
  }

  addLike(postId){
    var like = new Like('', this.identity._id, postId);
    this._likeService.addLike(this.token, like).subscribe(
      response => {
        if(response.like){
          this.updateLikes();
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
      });
  }

  removeLike(postId){
    this._likeService.deleteLike(this.token, postId).subscribe(
      response => {
        this.updateLikes();
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
      });
  }

  getLikes(postId: string){
    let promise = new Promise((resolve, reject) => {
      this._likeService.getLikes(this.token, postId).subscribe(
        response => {
          if(response.likes)
              resolve(response.likes);
          },
          error => {
            reject(error);
          });
    });
    return promise;
 }

}
