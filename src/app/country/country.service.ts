import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICountry } from './model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { parse as papaparse } from 'papaparse';

type TGeonames= {
  geonames: {
    continent:string;
    capital: string;
    languages: string;
    geonameId: string;
    countryCode: string;
    countryName: string;
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  public getAll(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>('./assets/country.json');

    // This is one alternative source for a list of all countries
    return this.http.get<TGeonames>('http://api.geonames.org/countryInfoJSON?formatted=false&lang=de&username=liftzettel&style=full').pipe(
      map(items => items.geonames.map(c => ({
        isoCode: c.countryCode,
        name: c.countryName
      })))
    );
  }

  constructor(
    private http: HttpClient
  ) { }
}
