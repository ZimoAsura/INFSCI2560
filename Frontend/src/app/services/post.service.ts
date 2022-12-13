import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Post } from '../models/post';


@Injectable()
export class PostService {
    public url: string;
    
    constructor(private _http: HttpClient){
        this.url = GLOBAL.url;
    }
    
    addPost(token, post): Observable<any>{
        console.log('addPost', token, post);
        let params = JSON.stringify(post);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        console.log(headers);
        
        return this._http.post(this.url + 'createpost', params, {headers: headers});
    }
    
    
    getPosts(token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        return this._http.get(this.url + 'posts', {headers: headers});
    }
    
    
    
     getPostUser(token, user_id, page = 1): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.get(this.url + 'posts-user/' + user_id, {headers: headers});
     }
    
    
    deletePost(token, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.delete(this.url + 'delete-post/' + id, {headers: headers});
    }
    
}