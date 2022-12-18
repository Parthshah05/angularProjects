import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { User } from '../models/user.model'
const baseUrl = 'http://localhost:4000/api/user'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl)
  }
  get(id: any): Observable<User> {
    return this.http.get(`${baseUrl}/${id}`)
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data)
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data)
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`)
  }
  findByName(name: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}/search/data?name=${name}`)
  }

  // SetHeaders(): HttpHeaders {
  //   const HeadersConfig = {
  //     'Content-Type': 'application/json; charset= utf-8',
  //     'Authorization': 'Bearer ' + localStorage.getItem('token'),
  //   };

  //   return new HttpHeaders(HeadersConfig);
  // }
}
