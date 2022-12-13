import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';
import { Like } from '../models/like';
import { Post } from '../models/post';


@Injectable()
export class LikeService {
    public url: string;
    
    constructor(
        private _http: HttpClient
    ){
        this.url = GLOBAL.url;    
     }
    
    
    addLike(token, like): Observable<any>{
        let params = JSON.stringify(like);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.post(this.url + 'like', params, {headers: headers});
    }
    
    checkLike(token, postId): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.get(this.url + 'like/' + postId, {headers: headers});
    }
    
    deleteLike(token, postId): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.delete(this.url + 'delete-like/' + postId, {headers: headers});
    }
    
    getLikes(token, postId): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                        .set('Authorization', token);
        
        return this._http.get(this.url + 'get-likes/' + postId, {headers: headers});
    }
}