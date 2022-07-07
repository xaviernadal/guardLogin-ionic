import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable } from 'rxjs';


const TOKEN_KEY = 'auth-token';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAutenthicated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAutenthicated.next(true);
    } else {
      this.isAutenthicated.next(false);
    }
  }

  login(credentials: { email, password }): Observable<any> {
    return this.http.post('https://reqres.in/api/login', credentials).pipe(
      map((data: any) => data.token),
      switchMap(token => {
        return from(Storage.set({ key: TOKEN_KEY, value: token }));
      }),
      tap(_ => {
        this.isAutenthicated.next(true);
      })
    )
  }
  logout():Promise<void> {
    this.isAutenthicated.next(false);
    return Storage.remove({ key: TOKEN_KEY });
  }


}
