import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanetsService } from '../services/planets.service';
import { GetTokenService } from '../services/get-token.service';
import { FindFalconeService } from '../services/find-falcone.service';
import { HomeComponent } from './home/home.component';
import { ResultComponent } from './result/result.component';


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'result', component: ResultComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [PlanetsService,
    GetTokenService,
    FindFalconeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
