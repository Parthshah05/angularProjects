import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth.model';
const baseUrl = 'http://localhost:4000/api/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/login`, data);
  }

  // SetHeaders(): HttpHeaders {
  //   const HeadersConfig = {
  //     'Content-Type': 'application/json; charset= utf-8',
  //     'Authorization': 'Bearer ' + localStorage.getItem('token'),
  //   };

  //   return new HttpHeaders(HeadersConfig);
  // }
}
