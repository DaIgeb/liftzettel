import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { StoreModule } from './store/store.module';
import { NgReduxModule } from '@angular-redux/store';
import { NgReduxRouterModule } from '@angular-redux/router';
import { HttpClientModule } from '@angular/common/http';
import { CountryModule } from './country/country.module';
import { NgReduxFormModule } from '@angular-redux/form';
import { CityModule } from './city/city.module';
import { StateModule } from './state/state.module';
import { MaterialModule } from './material.module';
import { StreetModule } from './street/street.module';
import { RatingModule } from './rating/rating.module';
import { ArrangementModule } from './arrangement/arrangement.module';
import { EnclosureModule } from './enclosure/enclosure.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    NotFoundComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgReduxFormModule,
    LayoutModule,
    HttpClientModule,
    NgReduxModule,
    NgReduxRouterModule.forRoot(),
    CountryModule,
    CityModule,
    StateModule,
    StreetModule,
    RatingModule,
    StoreModule,
    ArrangementModule,
    EnclosureModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {
 
}
