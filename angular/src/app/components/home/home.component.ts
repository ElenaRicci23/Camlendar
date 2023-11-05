import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';


/**
 * Questo è il componente principale della pagina di home.
 * Mostra un'immagine di sfondo e fornisce un pulsante "Enter" per
 * reindirizzare l'utente alla pagina di autenticazione.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  /**
   * L'URL dell'immagine di sfondo da visualizzare nella pagina home.
   */
  imageUrl = '/assets/back3.png';

  /**
   * Evento emesso quando l'utente fa clic sul pulsante "Enter".
   * Può essere utilizzato per gestire il reindirizzamento dell'utente.
   */
  @Output() enterClick = new EventEmitter<void>();

  /**
   * Crea un'istanza di HomeComponent.
   *
   * @param router Il servizio di routing per reindirizzare l'utente.
   */
  constructor(private router: Router) {}

  /**
   * Gestisce l'azione quando l'utente fa clic sul pulsante "Enter".
   * Reindirizza l'utente alla pagina di autenticazione e emette
   * l'evento `enterClick`.
   */
  enter() {
    this.router.navigate(['/autenticazione']);
    this.enterClick.emit();
  }
}
