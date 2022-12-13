import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';


@Injectable()
export class UserService {
    public url: string;
    public identity;
    public token;
    public stats;


    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }


    //The output of Observable<any> in case the rersponse from the server is different from the model of the client, any type of data
    register(user: User): Observable<any>{
        let params = JSON.stringify(user);

        //Specify the content type of the request to the server, in this case JSON
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        //The http client request is formed by the API method URL, the parameters and headers. Is a POST request
        return this._http.post(this.url+'register', params, {headers: headers});

    }

    signup(user: User, gettoken = null): Observable<any>{
        if(gettoken != null){
            user = Object.assign(user, {gettoken});
        }

        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.post(this.url + 'login', params, {headers: headers});
    }

    getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        if(identity != undefined){
            this.identity = identity;
        } else {
            this.identity = null;
        }
        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');
        if(token != undefined){
            this.token = token;
        } else {
            this.token = null;
        }
        return this.token;
    }

    getStats(){
        let stats = JSON.parse(localStorage.getItem('stats'));

        if(stats != "undefined"){
            this.stats = stats;
        } else {
            this.stats = null;
        }

        return this.stats;
    }

    getCounters(token, userId = null): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);
        console.log(this.getToken());
        if(userId != null){
            console.log('userId is not null');
            return this._http.get(this.url + 'counters/' + userId, {headers: headers});
        } else {
            return this._http.get(this.url + 'counters', {headers: headers});
        }
    }

    updateUser(token, user: User): Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);

        return this._http.put(this.url + 'update-user/' + user._id, params, {headers: headers});
    }

    getUsers(token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);

        return this._http.get(this.url + 'users', {headers: headers});
    }

    getUser(id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', this.getToken());

        return this._http.get(this.url + 'user/' + id, {headers: headers});
    }

    deleteUser(id, token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);
        
        return this._http.post(this.url + 'deleteUser/' + id, {headers: headers});
    }


}
