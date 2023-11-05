import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

/**
 * Servizio per la protezione delle rotte autenticate.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   * Costruttore del servizio.
   * @param authService Servizio per l'autenticazione degli studenti.
   * @param router Servizio di navigazione per reindirizzare gli utenti non autenticati.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Determina se un utente può accedere alla rotta protetta.
   * @returns `true` se l'utente è autenticato, altrimenti reindirizza a "/autenticazione" e restituisce `false`.
   */
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/autenticazione']);
      return false;
    }
  }
}
