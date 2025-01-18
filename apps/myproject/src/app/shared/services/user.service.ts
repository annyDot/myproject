import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { mockUsers, User } from '../../features/users/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // #http = inject(HttpClient);
  #apiUrl = 'http://localhost:4200';

  getUsers(): Observable<User[]> {
    // return this.#http.get<User[]>(`${this.#apiUrl}/get-all-users`);
    return of(mockUsers);
  }

  getUser(id: number): Observable<User> {
    // return this.#http.get<User>(`${this.#apiUrl}/${id}`);
    return EMPTY;
  }
}
