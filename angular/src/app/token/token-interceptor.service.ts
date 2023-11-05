import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

/**
 * Interceptor per gestire il token JWT nelle richieste HTTP e il refresh del token in caso di scadenza.
 */
@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  /**
   * Costruttore del servizio.
   * @param injector Iniettore per ottenere il servizio AuthService.
   * @param authService Servizio di autenticazione per gestire i token JWT.
   */
  constructor(private injector: Injector, private authService: AuthService) {}

  /**
   * Intercepta le richieste HTTP per aggiungere il token JWT alle intestazioni e gestire gli errori di autenticazione (401).
   * @param request Richiesta HTTP in ingresso.
   * @param next Gestore della richiesta HTTP successiva.
   * @returns Un'observable che emette l'evento HTTP risultante.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Aggiungi il token JWT alle intestazioni della richiesta se disponibile
    if (this.authService.getToken()) {
      request = this.addToken(request, this.authService.getToken());
    }

    // Gestisci eventuali errori di autenticazione (401)
    return next.handle(request).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  /**
   * Aggiunge il token JWT alle intestazioni della richiesta.
   * @param request Richiesta HTTP in cui aggiungere il token JWT.
   * @param token Token JWT da aggiungere.
   * @returns La richiesta HTTP con il token JWT nelle intestazioni.
   */
  private addToken(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
    const tokenValue = token || ''; // Se token è null, usa una stringa vuota
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${tokenValue}`
      }
    });
  }

  /**
   * Gestisce gli errori di autenticazione (401) effettuando il refresh del token e riprovando la richiesta.
   * @param request Richiesta HTTP originale.
   * @param next Gestore della richiesta HTTP successiva.
   * @returns Un'observable che emette l'evento HTTP risultante dopo il refresh del token.
   */
  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      // Effettua il refresh del token tramite il servizio di autenticazione
      return this.authService.doTokenRefresh().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.access);
          const updatedRequest = this.addToken(request, token.access);

          // Riprova la richiesta originale con il nuovo token
          return next.handle(updatedRequest).pipe(
            catchError(error => {
              if (error instanceof HttpErrorResponse && error.status === 401) {
                // Rimuovi il token in caso di errore di autenticazione
                this.authService.removeToken();
              }
              return throwError(error);
            })
          );
        })
      );

    } else {
      // Attendi il completamento del refresh prima di riprovare la richiesta
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          const updatedRequest = this.addToken(request, jwt);
          return next.handle(updatedRequest);
        })
      );
    }
  }
}
