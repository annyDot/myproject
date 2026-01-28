import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../../shared/models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  #http = inject(HttpClient);
  #baseUrl =
    'https://nxproject-1d229-default-rtdb.europe-west1.firebasedatabase.app/countries';

  public get(): Observable<Country[]> {
    return this.#http.get(`${this.#baseUrl}.json`).pipe(
      map((data) =>
        Object.entries(data).map(([id, country]) => {
          return { id: id, ...country };
        }),
      ),
    );
  }

  public getById(id: string): Observable<Country> {
    const url = `${this.#baseUrl}/${id}.json`;
    return this.#http.get<Country>(url).pipe(
      map((country) => ({
        ...country,
        id,
      })),
    );
  }
}
