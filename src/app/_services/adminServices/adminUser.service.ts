import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from '../../_models';
import { map, delay } from 'rxjs/operators';
import { AlertService } from '../alert.service';


export interface UserQuery {
    search: string;
    createdAt: Date;
}


@Injectable({ providedIn: 'root' })
export class AdminUserService {
    apiUrl: String = 'https://localhost:3000/api/admin';



    constructor(private alertService: AlertService, private http: HttpClient) { }




    findByEmail(email: String) {
        return this.http.get<User[]>(`${this.apiUrl}/users/${email}`);
    }

    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }



    getAllUsers(pageNumber,pageSize, filter ) {
        const params = new HttpParams()
            .set('page', pageNumber)
            .set('pageSize', pageSize)
            
            .set('filter', filter);
        return this.http.get<any>(`${this.apiUrl}/users`, { params })
            .pipe(map(data => {
                // login successful if there's a jwt token in the response http://localhost:3000
                if (data) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes

                    //this.alertService.success(" Wellcome to User Management!")
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
        return this.http.put(`${this.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }
}

