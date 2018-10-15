import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {

  private tokenUrl = 'https://findfalcone.herokuapp.com/token';

  constructor(private http: HttpClient) { }

  getToken() {
    const opt = {
      headers: new HttpHeaders({
     'Accept': 'application/json'
   })
  };
    return this.http.post(this.tokenUrl, null, opt);
  }
}
