import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = environment.apiEndPoint;
  public _registerData: any;

  constructor(private http: HttpClient) { }

  apiURL = 'http://localhost:8090/apartmant-api';

  get gregisterData(): any {
    return this._registerData;
  }

  set sregisterData(value: any) {
    this._registerData = value;
  }

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };



  public upDateUser(body: any) {
    console.log('API >> saveUser', body);
    return this.http.post<any>(this.API_URL + '/user/update', body, this.httpOption);
  }
  public saveUser(body: any) {
    console.log('API >> saveUser', body);
    return this.http.post<any>(this.API_URL + '/user/save', body, this.httpOption);
  }
  public getUser() {
    return this.http.get<any>(this.API_URL + '/user');
  }
  public getUserById(userid: any) {
    return this.http.get<any>(this.API_URL + '/user/' + `${userid}`);
  }
  deleteUserByUserId(userId: any): Observable<any> {
    return this.http.delete(this.API_URL + '/user/'.concat(userId),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text'
      }
    );
  }


  getAmphurAll(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/amphur')
  }
  getDistrictAll(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/district')
  }
  getProvinceAll(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/province')
  }

  getDistrictByDistrictId(DistrictId: any) {
    return this.http.get<any>(this.API_URL + '/district/'.concat(DistrictId), httpOptions);
  }
  getAllDistrict(zipCode: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/district/zipCode?zipCode=' + zipCode)
  }
  getDistricByZipCode(zipCode: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/district/by-zip-code?zipCode=' + zipCode)
  }
}


