import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { AlertService } from './alert.service';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {    

    // public isloggedIn:boolean=false;

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;



    
    constructor(private alertService: AlertService,private http: HttpClient) {
        
        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
       
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    public get getToken(): string {
        return localStorage.getItem('currentUserToken');
      }


    register(fullname:string,email: string, password: string){
    
        return this.http.post<any>(`https://localhost:3000/api/auth/register`, { fullname,email, password })
            .pipe(map(data => {

                console.log(data);
                // login successful if there's a jwt token in the response http://localhost:3000
                if (data && data.token) {
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('currentUserToken');
                
                    localStorage.removeItem('timer');
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                   
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                    localStorage.setItem('currentUserToken', JSON.stringify(data.token));
                    
                    const time_to_login = Date.now() + 604800000; 
                    localStorage.setItem('timer', JSON.stringify(time_to_login));
                    this.currentUserSubject.next(data.user);

                    this.alertService.success(" Successfully registered")
                }

                return data;
            })
            );
 


    }

    login(email: string, password: string) {
        return this.http.post<any>(`https://localhost:3000/api/auth/authenticate`, { email, password })
            .pipe(map(data => {
                // login successful if there's a jwt token in the response http://localhost:3000
                if (data && data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('currentUserToken');
                
                    localStorage.removeItem('timer');
                    
                    
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                    localStorage.setItem('currentUserToken', JSON.stringify(data.token));
                    
                    const time_to_login = Date.now() + 604800000; 
                    localStorage.setItem('timer', JSON.stringify(time_to_login));
                    this.currentUserSubject.next(data.user);
                 
                    this.alertService.success(" Successfully login")
                }

                return data;
            }));
    }

    fbLogin(token: string){
        return this.http.post<any>(`https://localhost:3000/api/auth/oauth/facebook`, { access_token: token })
            .pipe(map(data => {
                // login successful if there's a jwt token in the response http://localhost:3000
                if (data && data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('currentUserToken');
                
                    localStorage.removeItem('timer');
       
                    
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                    localStorage.setItem('currentUserToken', JSON.stringify(data.token));
                   
                    const time_to_login = Date.now() + 604800000; 
                    localStorage.setItem('timer', JSON.stringify(time_to_login));
                 
                    this.currentUserSubject.next(data.user);
                    this.alertService.success(" Wellcome !")
                }

                return data;
            }));
       
       
       
       
       
    }
    



    googleLogin(token: string){
        return this.http.post<any>(`https://localhost:3000/api/auth/oauth/google`, { access_token: token })
            .pipe(map(data => {
                // login successful if there's a jwt token in the response http://localhost:3000
                if (data && data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    
                    localStorage.removeItem('currentUser');
                    localStorage.removeItem('currentUserToken');

                    localStorage.removeItem('timer');
       
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                    localStorage.setItem('currentUserToken', JSON.stringify(data.token));
                   
                    const time_to_login = Date.now() + 604800000; 
                    localStorage.setItem('timer', JSON.stringify(time_to_login));
                 
                    this.currentUserSubject.next(data.user);
                }

                return data;
            }));
       
       
       
       
       
    }
    

    
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserToken');
       
        localStorage.removeItem('timer');
        this.currentUserSubject.next(null);
   
    }



}
