import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from "../environment/environment";
import { Student } from "../model/student";

/**
 * Servizio per l'autenticazione e l'interazione con il backend.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseurl = environment.apiBaseUrl;
  private _registerUrl: string = `${this._baseurl}/user/register/`;
  private _loginUrl: string = `${this._baseurl}/user/login/`;
  private _logout_url: string = `${this._baseurl}/user/logout/`;
  private _refresh_token: string = `${this._baseurl}/user/token/refresh/`;
  private _profileUrl: string = `${this._baseurl}/user/profile/`;

  /**
   * Costruttore del servizio.
   * @param http Oggetto HttpClient per effettuare richieste HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Registra un nuovo utente.
   * @param user Dati dell'utente da registrare.
   * @returns Un'observable che emette la risposta dalla richiesta HTTP.
   */
  registerUser(user: Student): Observable<any> {
    return this.http.post<any>(this._registerUrl, user);
  }

  /**
   * Effettua il login dell'utente e memorizza il token di accesso.
   * @param user Dati dell'utente per il login (email e password).
   * @returns Un'observable che emette la risposta dalla richiesta HTTP.
   */
  loginUser(user: { email: string; password: string; }): Observable<any> {
    return this.http.post<any>(this._loginUrl, user).pipe(
      tap((response: any) => {
        // Controlla se la risposta contiene un token di accesso
        if (response && response.access) {
          // Memorizza il token di accesso nel localStorage
          this.storeJwtToken(response.access);
        }
      })
    );
  }

  /**
   * Effettua il logout dell'utente.
   * @param data Dati dell'utente da utilizzare per il logout.
   * @returns Un'observable che emette la risposta dalla richiesta HTTP.
   */
  logoutUser(data: any): Observable<any> {
    return this.http.post<any>(this._logout_url, data);
  }

  /**
   * Effettua il refresh del token di accesso.
   * @param data Dati per il refresh del token.
   * @returns Un'observable che emette la risposta dalla richiesta HTTP.
   */
  refreshToken(data: any): Observable<any> {
    return this.http.post(this._refresh_token, data).pipe(
      tap((tokens: any) => {
        // Memorizza il nuovo token nel localStorage
        this.storeJwtToken(tokens.access);
      })
    );
  }

  /**
   * Verifica se l'utente è autenticato.
   * @returns `true` se l'utente è autenticato, altrimenti `false`.
   */
  isAuthenticated(): boolean {
    // !! significa che se il token è presente, restituisce true, altrimenti false
    return !!localStorage.getItem('token');
  }

  /**
   * Ottieni il token di accesso.
   * @returns Il token di accesso o `null` se non è presente.
   */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /**
   * Ottieni il token di refresh.
   * @returns Il token di refresh o `null` se non è presente.
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }

  /**
   * Rimuovi i token dal localStorage.
   */
  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
  }

  /**
   * Memorizza il token JWT nel localStorage.
   * @param jwt Token JWT da memorizzare.
   */
  private storeJwtToken(jwt: string) {
    localStorage.setItem('token', jwt);
  }

  /**
   * Effettua il refresh del token di accesso utilizzando il token di refresh.
   * @returns Un'observable che emette la risposta dalla richiesta HTTP.
   */
  doTokenRefresh() {
    return this.http.post<any>(this._refresh_token, {
      'refresh': this.getRefreshToken()
    }).pipe(tap((tokens: any) => {
      this.storeJwtToken(tokens.access);
    }));
  }

  /**
   * Ottieni il profilo dell'utente.
   * @returns Un'observable che emette i dati del profilo o `null` in caso di errore.
   */
  getProfile(): Observable<any> {
    return this.http.get<any>(this._profileUrl).pipe(
      catchError((error) => {
        console.error('Errore durante il recupero del profilo:', error);
        return of(null);  // Restituisci un observable vuoto in caso di errore
      })
    );
  }
}
