import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../../services/planets.service';
import { GetTokenService } from '../../services/get-token.service';
import { FindFalconeService } from '../../services/find-falcone.service';
import { Planet } from '../../planet/planet';
import { Vehicle } from '../../vehicle/vehicle';
import { MatFormField } from '@angular/material';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  spinnerFlag: boolean;
  planets: Planet[];
  vehicles: Vehicle[];
  planetVehiclesOne: Vehicle[];
  planetVehiclesTwo: Vehicle[];
  planetVehiclesThree: Vehicle[];
  planetVehiclesFour: Vehicle[];
  chosenPlanet: string;
  filteredOptions: Observable<Planet[]>;
  filteredOptionsOne: Observable<Planet[]>;
  filteredOptionsTwo: Observable<Planet[]>;
  filteredOptionsThree: Observable<Planet[]>;
  filteredOptionsFour: Observable<Planet[]>;
  planetFlagOne = true;
  planetFlagTwo = false;
  planetFlagThree = false;
  planetFlagFour = false;
  vehicleOneFlag = false;
  vehicleTwoFlag = false;
  vehicleThreeFlag = false;
  vehicleFourFlag = false;
  popPlanets: Array<String> = [];
  planetFilteredList: Planet[];
  public myform: FormGroup;
  index;
  selectedOption: string;
  tempVehicleOne: string;
  tempVehicleTwo: string;
  tempVehicleThree: string;
  tempVehicleFour: string;
  timeTaken = 0;
  planetSelected: string;
  vehicleSelected = 0;
  vehicleSpeed = 0;
  timeTakenOne = 0;
  timeTakenTwo = 0;
  timeTakenThree = 0;
  falconBody: any;
  falconPlanetNames = [];
  falconVehicleNames = [];
  falconToken: any;

  falconForm = this.fb.group({
    planetOne: [{value: '', disabled: false}, Validators.required],
    vehicleOne: [''],
    planetTwo: [{value: '', disabled: true}, Validators.required],
    vehicleTwo: [''],
    planetThree: [{value: '', disabled: true}, Validators.required],
    vehicleThree: [''],
    planetFour: [{value: '', disabled: true}, Validators.required],
    vehicleFour: ['']
  });

   constructor(private fb: FormBuilder, private planetsService: PlanetsService, private getAIToken: GetTokenService,
     private getAIFalcon: FindFalconeService) {
     this.falconForm.get('vehicleOne').valueChanges.subscribe(val => {
       console.log(this.tempVehicleOne);
       if (val) {
        for (let i = 0; i < this.planetVehiclesOne.length; i++) {
          if (this.tempVehicleOne && this.tempVehicleOne === this.planetVehiclesOne[i].name) {
            this.planetVehiclesOne[i].total_no++;

          }
          if (val === this.planetVehiclesOne[i].name && this.planetVehiclesOne[i].total_no > 0) {
            this.planetVehiclesOne[i].total_no--;
            this.vehicleSpeed = this.planetVehiclesOne[i].speed;
           }
        }
       }
       this.tempVehicleOne = val;
      this.timeTaken = this.vehicleSelected / this.vehicleSpeed;
      this.timeTakenOne = this.timeTaken;
     });


     this.falconForm.get('vehicleTwo').valueChanges.subscribe(val => {
       console.log(this.tempVehicleTwo);
       if (val) {
        for (let i = 0; i < this.planetVehiclesTwo.length; i++) {
          if (this.tempVehicleTwo && this.tempVehicleTwo === this.planetVehiclesTwo[i].name ) {
            this.planetVehiclesTwo[i].total_no++;
          }
          if (val === this.planetVehiclesTwo[i].name && this.planetVehiclesTwo[i].total_no > 0) {
            this.planetVehiclesTwo[i].total_no--;
            this.vehicleSpeed = this.planetVehiclesOne[i].speed;
           }
        }
       }
       this.tempVehicleTwo = val;
       console.log(this.vehicleSelected);
       console.log(this.vehicleSpeed);
       this.timeTaken = this.timeTakenOne + (this.vehicleSelected / this.vehicleSpeed);
       this.timeTakenTwo = this.timeTaken;
     });

     this.falconForm.get('vehicleThree').valueChanges.subscribe(val => {
      console.log(this.tempVehicleThree);
      if (val) {
       for (let i = 0; i < this.planetVehiclesThree.length; i++) {
         if (this.tempVehicleThree && this.tempVehicleThree === this.planetVehiclesThree[i].name) {
          this.planetVehiclesThree[i].total_no++;
         }
         if (val === this.planetVehiclesThree[i].name && this.planetVehiclesThree[i].total_no > 0) {
          this.planetVehiclesThree[i].total_no--;
          this.vehicleSpeed = this.planetVehiclesOne[i].speed;
          }
       }
      }
      this.tempVehicleThree = val;
      console.log(this.vehicleSelected);
      console.log(this.vehicleSpeed);
      this.timeTaken = this.timeTakenTwo + (this.vehicleSelected / this.vehicleSpeed);
      this.timeTakenThree = this.timeTaken;
    });

    this.falconForm.get('vehicleFour').valueChanges.subscribe(val => {
      console.log(this.tempVehicleFour);
      if (val) {
       for (let i = 0; i < this.planetVehiclesFour.length; i++) {
         if (this.tempVehicleFour && this.tempVehicleFour === this.planetVehiclesFour[i].name) {
          this.planetVehiclesFour[i].total_no++;
         }
         if (val === this.planetVehiclesFour[i].name && this.planetVehiclesFour[i].total_no > 0) {
          this.planetVehiclesFour[i].total_no--;
          this.vehicleSpeed = this.planetVehiclesOne[i].speed;
          }
       }
      }
      this.tempVehicleFour = val;
      console.log(this.vehicleSelected);
      console.log(this.vehicleSpeed);
      this.timeTaken = this.timeTakenThree + (this.vehicleSelected / this.vehicleSpeed);
    });
   }

    ngOnInit() {
      this.getPlanets();
      this.getVehicles();
      console.log(this.falconForm);
  }

  getPlanets(removePlanets?: Array<String>) {
      this.planetsService.getPlanets().subscribe((x: Planet[]) => {
      this.planets = x;
       if (removePlanets) {
        for (let i = 0; i < removePlanets.length; i++) {
          console.log(removePlanets[i]);
          // this.planetFilteredList = this.planets.filter(planet => planet.name === removePlanets[i]);
          const index = this.planets.findIndex(planet => planet.name === removePlanets[i]);
          this.planets.splice(index, 1);
        }
      }
      console.log(this.planets);
      this.getAutoPlanets(this.planets);
     });
  }

  getAutoPlanets(autoPlanets: Planet[]) {

      this.filteredOptionsOne = this.falconForm.get('planetOne').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, autoPlanets)),
      );


      this.filteredOptionsTwo = this.falconForm.get('planetTwo').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, autoPlanets))
      );

      this.filteredOptionsThree = this.falconForm.get('planetThree').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, autoPlanets))
      );

      this.filteredOptionsFour = this.falconForm.get('planetFour').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, autoPlanets))
      );
     }

     selectedPlanet(event, planetSel) {
       const e = 0;
       console.log(event);
      if (planetSel === 'planetOne') {
        this.planetVehiclesOne = JSON.parse(JSON.stringify(this.vehicles));
        this.vehicleOneFlag = true;
        this.falconForm.get('planetTwo').enable();
        this.planetSelected = this.falconForm.get('planetOne').value;
      for (let i = 0; i < this.planets.length; i++) {
        if (this.planets[i].name === this.planetSelected) {
         this.vehicleSelected = this.planets[i].distance;
      }
      }
        this.popPlanets.push(this.falconForm.get('planetOne').value);
        this.getPlanets(this.popPlanets);
      } else if (planetSel === 'planetTwo') {
        this.planetVehiclesTwo = JSON.parse(JSON.stringify(this.planetVehiclesOne));
        this.vehicleTwoFlag = true;
        this.falconForm.get('planetThree').enable();
        this.falconForm.get('vehicleOne').disable();
        this.popPlanets.push(this.falconForm.get('planetTwo').value);
        this.planetSelected = this.falconForm.get('planetTwo').value;
        for (let i = 0; i < this.planets.length; i++) {
          if (this.planets[i].name === this.planetSelected) {
           this.vehicleSelected = this.planets[i].distance;
          }
        }
        this.getPlanets(this.popPlanets);
      } else if (planetSel === 'planetThree') {
        this.planetVehiclesThree = JSON.parse(JSON.stringify(this.planetVehiclesTwo));
        this.vehicleThreeFlag = true;
        this.falconForm.get('planetFour').enable();
        this.falconForm.get('vehicleTwo').disable();
        this.popPlanets.push(this.falconForm.get('planetThree').value);
        this.planetSelected = this.falconForm.get('planetThree').value;
        for (let i = 0; i < this.planets.length; i++) {
          if (this.planets[i].name === this.planetSelected) {
           this.vehicleSelected = this.planets[i].distance;
          }
        }
        this.getPlanets(this.popPlanets);
      } else if (planetSel === 'planetFour') {
        this.planetVehiclesFour = JSON.parse(JSON.stringify(this.planetVehiclesThree));
        this.vehicleFourFlag = true;
        this.falconForm.get('vehicleThree').disable();
        this.planetSelected = this.falconForm.get('planetFour').value;
        for (let i = 0; i < this.planets.length; i++) {
          if (this.planets[i].name === this.planetSelected) {
           this.vehicleSelected = this.planets[i].distance;
          }
        }
      }
     }

     selectedVehicle(event) {
        console.log(event);
     }
  private _filter(value: string, autoPlanets: Planet[]) {
    const filterValue = value.toLowerCase();
    return autoPlanets.filter(autoPlanet => autoPlanet.name.toLowerCase().includes(filterValue));
  }

  getVehicles() {
    this.planetsService.getVehicles().subscribe((x: Vehicle[]) => {
      this.vehicles = x;
      console.log(x);
    });
  }

  disableVehicle(e) {
    if ( e.total_no === 0 || e.max_distance < this.vehicleSelected) {
      return true;
    }
  }

  findFalcone() {
    this.falconPlanetNames.push(this.falconForm.get('planetOne').value);
    this.falconPlanetNames.push(this.falconForm.get('planetTwo').value);
    this.falconPlanetNames.push(this.falconForm.get('planetThree').value);
    this.falconPlanetNames.push(this.falconForm.get('planetFour').value);
    this.falconVehicleNames.push(this.falconForm.get('vehicleOne').value);
    this.falconVehicleNames.push(this.falconForm.get('vehicleTwo').value);
    this.falconVehicleNames.push(this.falconForm.get('vehicleThree').value);
    this.falconVehicleNames.push(this.falconForm.get('vehicleFour').value);
    console.log(this.falconPlanetNames);
    console.log(this.falconVehicleNames);

    this.getAIToken.getToken().subscribe( x => {
      this.falconToken = x;
      this.falconBody = {
        'token': this.falconToken.token,
        'planet_names': this.falconPlanetNames,
        'vehicle_names': this.falconVehicleNames
      };

      this.getAIFalcon.getFalcon(this.falconBody).subscribe(y => {
        console.log(y);
      console.log(this.falconBody);
      this.planetsService.setFalcon(y, this.timeTaken);
      });
         });
  }
}
