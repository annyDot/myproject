import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { City } from '../../shared/models/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  #http = inject(HttpClient);
  #baseUrl =
    'https://nxproject-1d229-default-rtdb.europe-west1.firebasedatabase.app/countries';

  public get(): Observable<City[]> {
    return this.#http.get(`${this.#baseUrl}.json`).pipe(
      map((data) =>
        Object.entries(data).map(([id, city]) => {
          return { id: id, ...city };
        }),
      ),
    );
  }

  public getById(id: string): Observable<City> {
    const url = `${this.#baseUrl}/${id}.json`;
    return this.#http.get<City>(url).pipe(
      map((city) => ({
        ...city,
        id,
      })),
    );
  }
}
