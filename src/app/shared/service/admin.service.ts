
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// var FormData = require('form-data');
// var fs = require('fs');
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
const endpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private API_URL = environment.apiEndPoint;

  constructor(private http: HttpClient) { }

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getAllUsers(): Observable<any> {
    return this.http.get(endpoint + '/user', httpOptions);
  }

  getUserByUserId(userId: any): Observable<any> {
    return this.http.get(endpoint + '/user/'.concat(userId), httpOptions);
  }

  deleteUserByUserId(userId: any): Observable<any> {
    return this.http.delete(endpoint + '/user/'.concat(userId),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text'
      }
    );
  }

  //invoice

  public saveInvoice(body: any) {
    console.log('LOG API saveinvoice', body);
    return this.http.post<any>(this.API_URL + '/invoice/save', body, this.httpOption);
  }
  public updateinvoice(body: any) {
    console.log('API >> updateinvoice', body);
    return this.http.post<any>(this.API_URL + '/invoice/update', body, this.httpOption);
  }
  public getAllInvoice() {
    return this.http.get<any>(this.API_URL + '/invoice');
  }
  public getInvoiceByInvoiceId(invoiceId: any) {
    return this.http.get<any>(this.API_URL + '/invoice/'.concat(invoiceId), httpOptions);
  }
  public getinvoiceByuserId(userId: any) {
    return this.http.get<any>(this.API_URL + '/invoice/' + `by-userId${userId}`)
  }
  deleteinvoiceByInId(inId: any): Observable<any> {
    return this.http.delete(this.API_URL + '/invoice/'.concat(inId),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text'
      }
    );
  }

  //payment
  public generateBillPayment(inId: any) {
    return this.http.get<any>(this.API_URL + '/report/' + `generateBillPayment?inId=${inId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'body',
      responseType: 'blob' as 'json'
    });
  }

  public sendEmailPayment(inId: any) {
    return this.http.get<any>(this.API_URL + '/send-email/' + `payment?inId=${inId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    });
  }

  uploadFile(param: any, inId: any): Observable<any> {
    var from = new FormData();
    from.append('multipartFile', param);
    return this.http.post<any>(this.API_URL + `/uploadFile?inId=${inId}`, from)
  }

  uploadFile2(param: any, data1: any): Observable<any> {
    var from = new FormData();
    from.append('multipartFile', param);
    from.append('request', JSON.stringify(data1));
    return this.http.post<any>(this.API_URL + `/uploadFile2`, from)
  }
  
  public downLoadFile(inId: any) {
    return this.http.get<any>(this.API_URL + `/downLoadFile?inId=${inId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'body',
      responseType: 'blob' as 'json'
    });
  }

  public downLoadFile2(conId: any) {
    return this.http.get<any>(this.API_URL + `/downLoadFile2?conId=${conId}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'body',
      responseType: 'blob' as 'json'
    });
  }
  
  

  public getAllPayment() {
    return this.http.get<any>(this.API_URL + '/payments');
  }
  public savePayment(body: any) {
    console.log('LOG API savepayments >>::', body);
    return this.http.post<any>(this.API_URL + '/payment/save', body, this.httpOption);
  }
  public updatePayment(body: any) {
    console.log('Log API updatepayments >>::', body);
    return this.http.post<any>(this.API_URL + '/payment/update', body, this.httpOption);
  }
  public getPaymentBypayId(payId: any) {
    return this.http.get<any>(this.API_URL + '/payment/'.concat(payId), httpOptions);
  }
  deletepaymentBypayId(payId: any): Observable<any> {
    return this.http.delete(this.API_URL + '/payment/'.concat(payId),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text'
      }
    );
  }
  

}

