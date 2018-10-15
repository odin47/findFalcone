import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Planet } from '../planet/planet';
import { Vehicle } from '../vehicle/vehicle';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {

  private planetUrl = 'https://findfalcone.herokuapp.com/planets';
  private vehicleUrl = 'https://findfalcone.herokuapp.com/vehicles';
  private falconResult: any;
  private messageSource = new BehaviorSubject<any>('default message');
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  getPlanets() {
    return this.http.get<Planet[]>(this.planetUrl);
  }

  getVehicles() {
    return this.http.get<Vehicle[]>(this.vehicleUrl);
  }

  setFalcon(result, time) {
    result.time = time;
    this.falconResult = result;
    this.messageSource.next(result);
    }

  getFalcon() {
    return this.falconResult;
  }
}
