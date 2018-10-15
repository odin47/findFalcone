import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetTokenService {

  private tokenUrl = 'https://findfalcone.herokuapp.com/token';
  constructor() { }
}
