import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedsService {

  private API_URL = environment.apiEndPoint;
  public _registerData: any;


  constructor(private http: HttpClient) { }
    // Define API URL
    apiURL = 'http://localhost:9080/apartmant-api';
    
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
  public saveRoom(body: any) {
    console.log('API >> saveRoom', body);
    return this.http.post<any>(this.API_URL + '/room/save', body, this.httpOption);
  }
  public getRoom() {
    return this.http.get<any>(this.API_URL + '/room');

  }
  public getRoomByroomId(roomid: any) {
    return this.http.get<any>(this.API_URL + '/room/' + `${roomid}`);
  }
}
