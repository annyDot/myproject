import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #http = inject(HttpClient);
  #baseUrl =
    'https://nxproject-1d229-default-rtdb.europe-west1.firebasedatabase.app/users';

  public get(): Observable<User[]> {
    return this.#http.get(`${this.#baseUrl}.json`).pipe(
      map((data) =>
        Object.entries(data).map(([id, user]) => {
          return { id: id, ...user };
        }),
      ),
    );
  }

  public getById(id: string): Observable<User> {
    const url = `${this.#baseUrl}/${id}.json`;
    return this.#http.get<User>(url).pipe(
      map((user) => ({
        ...user,
        id,
      })),
    );
  }

  public create(user: User): Observable<User> {
    return this.#http
      .post<{ name: string }>(`${this.#baseUrl}.json`, user)
      .pipe(
        map((response) => ({
          ...user,
          id: response.name,
        })),
      );
  }

  public update(user: User): Observable<User> {
    const url = `${this.#baseUrl}/${user.id}.json`;
    const { id, ...userData } = user;
    return this.#http.patch<User>(url, userData).pipe(
      map((updatedUser) => ({
        ...updatedUser,
        id,
      })),
    );
  }
}
