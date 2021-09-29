
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
  public geyinvoiceByuserId(userId: any){
    return this.http.get<any>(this.API_URL + '/invoice/' + `by-userId${userId}`)
  }

  //payment

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

}

