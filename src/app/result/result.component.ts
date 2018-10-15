import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../../services/planets.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  private falconResult;
  message: any;
  resultFlag: boolean;
  constructor(private planetsService: PlanetsService) {
     }

  ngOnInit() {
    this.planetsService.currentMessage.subscribe(message => {
      this.message = message;
      console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@' + this.message.status);
      if (this.message.status === 'success') {
          this.resultFlag = true;
        } else {
          this.resultFlag = false;
        }
    console.log('RESULTTTTTTTTTTTTTt' + JSON.stringify(message));
    console.log('FLaggggggg' + this.resultFlag);
  });
  }

}
