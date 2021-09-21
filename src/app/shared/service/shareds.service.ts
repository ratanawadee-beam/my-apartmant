import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedsService {

  private API_URL = environment.apiEndPoint;
  public _registerData: any;


  constructor(private http: HttpClient) { }
  // Define API URL
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

  // room
  public saveRoom(body: any) {
    console.log('API >> saveRoom', body);
    return this.http.post<any>(this.API_URL + '/room/save', body, this.httpOption);
  }
  public updateRoom(body: any) {
    console.log('API >> updateRoom', body);
    return this.http.post<any>(this.API_URL + '/room/update', body, this.httpOption);
  }
  public getRoom() {
    return this.http.get<any>(this.API_URL + '/room');
  }
  public getRoomByroomId(roomid: any) {
    return this.http.get<any>(this.API_URL + '/room/' + `${roomid}`);
  }

  // rent

  public seveRent(body: any) {
    console.log('API >> saveRent', body);
    return this.http.post<any>(this.API_URL + '/rent/save', body, this.httpOption);
  }
  public updateRent(body: any) {
    console.log('API >> updateRent', body);
    return this.http.post<any>(this.API_URL + '/rent/update', body, this.httpOption);
  }
  public getRent() {
    return this.http.get<any>(this.API_URL + '/rent');
  }
  public getRentByrentId(rentId: any) {
    return this.http.get<any>(this.API_URL + '/rent/' + `${rentId}`);
  }
  deleteRentByRentId(rentId: any): Observable<any> {
    return this.http.delete(this.API_URL + '/rent/'.concat(rentId),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text'
      }
    );
  }

  //invoiceDE

  public saveInvoicedetail(body: any) {
    console.log('LOG API saveinvoice', body);
    return this.http.post<any>(this.API_URL + '/invoicedetail/save', body, this.httpOption);
  }
  public updateInvoicedetail(body: any) {
    console.log('API >> updateinvoi', body);
    return this.http.post<any>(this.API_URL + '/invoicedetail/update', body, this.httpOption);
  }
  public getAllInvoicedetail() {
    return this.http.get<any>(this.API_URL + '/invoicedetail');
  }
  public getInvoicedetailBydeId(deid: any) {
    return this.http.get<any>(this.API_URL + '/invoicedetail/' + `${deid}`);
  }


}
