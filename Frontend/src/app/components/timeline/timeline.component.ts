import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Post } from '../../models/post';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { GLOBAL } from '../../services/global';

import { Like } from '../../models/like';
import { LikeService } from '../../services/like.service';

declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
  providers: [UserService, PostService, LikeService]
})
export class TimelineComponent implements OnInit {

  public title: string;
  public identity;
  public token;
  public url: string;
  public status: string;
  public posts: any[];
  //Check if show or no button of Load More
  public noMore = false;
  public showImage;
  public loading: boolean;
  //LIKES//
  public likes: any[];
  public liked: boolean;

  constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _postService: PostService,
        private _likeService: LikeService
    ){
        this.title = 'Timeline';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.loading = true;
        this.posts;
    }

  ngOnInit() {
      console.log("Timeline Component Working...");
      this.getPosts();
  }

  getPosts(){
      this._postService.getPosts(this.token).subscribe(
        response => {
            if(response.posts) {
              this.loading = false;
              this.posts = response.posts;
              //UPDATE LIKES COUNTER AND HEART
              // this.updateLikes();
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

    //This functions comes from the component child Sidebar (Output), when the button post is clicked
    refresh(event = null){
      this.getPosts();
      this.noMore = false;
    }

    showThisImage(id){
      this.showImage = id;
    }

    hideThisImage(id){
      this.showImage = 0;
    }

    deletePost(id){
      this._postService.deletePost(this.token, id).subscribe(
        response => {
          this.refresh();
        },
        error => {
          console.log(<any>error);
        });
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

                      this.likes.forEach((like) => {
                        if(like.user._id == this.identity._id){
                          this.posts[index].liked = true;
                        }
                      });

                    }).catch(error => console.log(error));
        });
    }


    doLike(post, event: any) {
      if(post.liked) {
        event.target.src = '../../../assets/images/empty-heart.png';
        this.quitLike(post._id);
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

    quitLike(postId){
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
            if(response.likes) resolve(response.likes);
          },
          error => {
            reject(error);
          });
      });
      return promise;
    }
}
