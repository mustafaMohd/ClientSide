import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../../_models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AdminUserService {
     apiUrl: String = 'https://localhost:3000/api/admin';
    alertService: any;

    constructor(private http: HttpClient) { }
 findByEmail(email:String){
     return  this.http.get<User[]>(`${this.apiUrl}/users/${email}`);
 }
//  isloggedIn(){
//      return this.
//  }


    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }

    getAllUsers(){
        return this.http.get<User[]>(`${this.apiUrl}/users`)
            .pipe(map(data => {
                // login successful if there's a jwt token in the response http://localhost:3000
                if (data ) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                   
                    this.alertService.success(" Wellcome to User Management!")
                }
    
                return data;
            }));
        }

    register(user: User) {
        return this.http.post(`${this.apiUrl}/register`, user);
    }
    // getById(id: number) {
    //     return this.http.get(`${this.apiUrl}/users/${id}`);
    // }

    

    update(user: User) {
        return this.http.put(`${this.apiUrl}/users/${user._id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }
}

