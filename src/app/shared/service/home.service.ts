import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: variable-name
  private API_URL = environment.apiEndPoint;
  public _registerData: any;

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  private _$userType: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private _$taxInfo: BehaviorSubject<any> = new BehaviorSubject<any>({});

  public get $userType(): Observable<any> {
    return this._$userType.asObservable();
  }
  public set $userType(value: Observable<any>) {
    value.subscribe(data => {
      this._$userType.next(data);
    });
  }
  
  public get $taxInfo(): Observable<any> {
    return this._$taxInfo.asObservable();
  }
  public set $taxInfo(value: Observable<any>) {
    value.subscribe(data => {
      this._$taxInfo.next(data);
    });
  }

  loginByUsernamePassword(auth: any): Observable<any> {
    return this.http.post<any>(this.API_URL + '/authentication/login', JSON.stringify(auth), this.httpOption)
  }

}