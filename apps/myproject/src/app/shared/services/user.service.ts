import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../features/users/models/user.interface';
import { parseData } from '../utils/parseData';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #http = inject(HttpClient);
  #baseUrl =
    'https://nxproject-1d229-default-rtdb.europe-west1.firebasedatabase.app/users';

  getUsers(): Observable<User[]> {
    return this.#http
      .get<User[]>(`${this.#baseUrl}.json`)
      .pipe(map((data) => parseData(data)));
  }

  getUser(id: string): Observable<User> {
    const url = `${this.#baseUrl}/${id}.json`;
    return this.#http.get<User>(url);
  }

  addUser(user: User): Observable<User> {
    return this.#http.post<User>(`${this.#baseUrl}.json`, user);
  }

  deactivateUser(userId: string): Observable<void> {
    const url = `${this.#baseUrl}/${userId}.json`;
    const data = { status: 'inactive' };
    return this.#http.patch<void>(url, data);
  }

  activateUser(userId: string): Observable<void> {
    const url = `${this.#baseUrl}/${userId}.json`;
    const data = { status: 'active' };
    return this.#http.patch<void>(url, data);
  }
}
