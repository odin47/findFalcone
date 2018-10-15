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
      if (this.message.status === 'success') {
          this.resultFlag = true;
        } else {
          this.resultFlag = false;
        }
  });
  }

}
