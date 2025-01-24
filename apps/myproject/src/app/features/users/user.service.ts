import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../features/users/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #http = inject(HttpClient);
  #baseUrl =
    'https://nxproject-1d229-default-rtdb.europe-west1.firebasedatabase.app/users';

  getUsers(): Observable<User[]> {
    return this.#http.get(`${this.#baseUrl}.json`).pipe(
      map((data) =>
        Object.entries(data).map(([id, user]) => {
          return { id: id, ...user };
        })
      )
    );
  }

  getUser(id: string): Observable<User> {
    const url = `${this.#baseUrl}/${id}.json`;
    return this.#http.get<User>(url).pipe(
      map((user) => ({
        ...user,
        id,
      }))
    );
  }

  addUser(user: User): Observable<User> {
    return this.#http
      .post<{ name: string }>(`${this.#baseUrl}.json`, user)
      .pipe(
        map((response) => ({
          ...user,
          id: response.name,
        }))
      );
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.#baseUrl}/${user.id}.json`;
    const { id, ...userData } = user;
    return this.#http.patch<User>(url, userData).pipe(
      map((updatedUser) => ({
        ...updatedUser,
        id,
      }))
    );
  }
}
