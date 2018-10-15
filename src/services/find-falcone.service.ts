import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FindFalconeService {

  private falconUrl = 'https://findfalcone.herokuapp.com/find';
  constructor(private http: HttpClient) { }

  getFalcon(findFalconSubmit): any {
    const opt = {
      headers: new HttpHeaders({
     'Accept': 'application/json',
     'Content-Type': 'application/json'
   })
  };
    return this.http.post(this.falconUrl, findFalconSubmit, opt);
  }
}
