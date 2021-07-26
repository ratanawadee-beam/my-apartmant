import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public saveUser(body: any) {
    console.log('API >> saveUser', body);

    return this.http.post<any>(this.API_URL + '/user/save', body, this.httpOption);
  }

  public upDateUser(body: any) {
    console.log('API >> saveUser', body);

    return this.http.post<any>(this.API_URL + '/user/update', body, this.httpOption);
  }

  public getUser() {
    return this.http.get<any>(this.API_URL + '/user');
  }

  public getUserById(user_id: any) {
    return this.http.get<any>(this.API_URL + '/user/' + `${user_id}`);
  }

}