import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { File } from '../models/file.model'
const baseUrl = 'http://localhost:4000/api/file'
@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<File[]> {
    return this.http.get<File[]>(`${baseUrl}/upload`)
  }
  getOcr(): Observable<File[]> {
    return this.http.get<File[]>(`${baseUrl}/ocr`)
  }
  upload(data: any): Observable<any> {
    const formData: FormData = new FormData()
    formData.append('file', data)
    return this.http.post(`${baseUrl}/upload`, formData)
  }
  // update(id: any, data: any): Observable<any> {
  //   return this.http.put(`${baseUrl}/${id}`, data);
  // }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`)
  }
  ocr(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/ocr`, data)
  }
  findByPdfName(name: any): Observable<any> {
    return this.http.post(`${baseUrl}/searchPdf`, name)
  }

  // SetHeaders(): HttpHeaders {
  //   const HeadersConfig = {
  //     'Content-Type': 'application/json; charset= utf-8',
  //     'Authorization': 'Bearer ' + localStorage.getItem('token'),
  //   };

  //   return new HttpHeaders(HeadersConfig);
  // }
}
