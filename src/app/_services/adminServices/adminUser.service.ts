import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from '../../_models';
import { map, delay } from 'rxjs/operators';
import { AlertService } from '../alert.service';
import { Subject } from 'rxjs';

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
        return this.http.get<{userlist:User[],count:number}>(`${this.apiUrl}/users`, { params })
            .pipe(map(data => {
                // login successful if there's a jwt token in the response http://localhost:3000
                if (data) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes

                    //this.alertService.success(" Wellcome to User Management!")
                }

                return data;
            }));
    }




    
    create(fullname:string,email: string, password: string) {
        
        
        return this.http.post<any>(`${this.apiUrl}/users`,{ fullname,email, password });
    }
    // getById(id: number) {
    //     return this.http.get(`${this.apiUrl}/users/${id}`);
    // }



    update(userId:string, fullname:string,email:string) {
        return this.http.put<any>(`${this.apiUrl}/users/${userId}`, {fullname,email});
    }

    changePassword(userId:string, newPassword:string) {
        return this.http.put<any>(`${this.apiUrl}/users/changePassword/${userId}`, {newPassword});
    }
    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }
}

