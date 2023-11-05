import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Servizio per la sanitizzazione e la validazione di input.
 */
@Injectable({
  providedIn: 'root'
})
export class SanitizationService {

  /**
   * Costruttore del servizio.
   * @param sanitizer Servizio per la manipolazione di contenuti HTML in modo sicuro.
   */
  constructor(private sanitizer: DomSanitizer) {}

  /**
   * Sanitizza una stringa HTML per impedire l'iniezione di script dannosi o markup.
   * @param input Stringa HTML da sanificare.
   * @returns Versione sicura della stringa HTML.
   */
  sanitizeHtml(input: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(input);
  }

  /**
   * Sanitizza una stringa rimuovendo i caratteri speciali.
   * @param input Stringa da sanificare.
   * @returns Stringa sanificata senza caratteri speciali.
   */
  sanitizeInput(input: string): string {
    // Rimuovi i caratteri speciali utilizzando una regex
    return input.replace(/[^a-zA-Z0-9\s]/g, '');
  }

  /**
   * Esegue una semplice validazione per verificare se una stringa è vuota o null.
   * @param input Stringa da validare.
   * @returns `true` se la stringa non è vuota e non è null, altrimenti `false`.
   */
  isValidString(input: string): boolean {
    return input !== null && input.trim() !== '';
  }

  /**
   * Esegue la validazione di un'email utilizzando una regex.
   * @param email Indirizzo email da validare.
   * @returns `true` se l'indirizzo email è valido, altrimenti `false`.
   */
  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }
}
