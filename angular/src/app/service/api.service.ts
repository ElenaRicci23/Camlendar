import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Docente } from '../model/docente';
import { Corso } from '../model/corso';
import { Lezione } from '../model/lezione';

/**
 * Servizio per l'interazione con le API del backend.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  /**
   * Costruttore del servizio.
   * @param http Oggetto HttpClient per effettuare richieste HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Ottiene la lista dei docenti.
   * @returns Un'observable che emette un array di oggetti `Docente`.
   */
  getDocenti(): Observable<Docente[]> {
    return this.http.get<Docente[]>(`${this.baseUrl}/docenti/`);
  }

    /**
   * Ottiene la lista dei docenti per un anno specifico dal server API.
   *
   * @param {string} anno - L'anno per cui si desidera ottenere la lista dei docenti.
   * @returns {Observable<Docente[]>} - Un observable che emette un array di oggetti Docente.
   */
  getDocentiPerAnno(anno: string): Observable<Docente[]> {
    return this.http.get<Docente[]>(`${this.baseUrl}/docenti-per-anno/${anno}/`);
  }

  /**
   * Ottiene la lista dei corsi.
   * @returns Un'observable che emette un array di oggetti `Corso`.
   */
  getCorsi(): Observable<Corso[]> {
    return this.http.get<Corso[]>(`${this.baseUrl}/corsi/`);
  }

  /**
   * Ottiene la lista degli esami per un'email specifica.
   * @param email Email dello studente.
   * @returns Un'observable che emette un array di oggetti `any`.
   */
  getEsami(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/esami/${email}/`);
  }

  /**
   * Aggiorna il punteggio di un esame.
   * @param email Email dello studente.
   * @param id_esame ID dell'esame da aggiornare.
   * @param examData Dati dell'esame da aggiornare.
   * @returns Un'observable che emette la risposta dalla richiesta HTTP.
   */
  updateExamScore(email: string, id_esame: number, examData: any): Observable<any> {
    const url = `${this.baseUrl}/esami/${email}/${id_esame}/aggiorna-voto/`;
    return this.http.put(url, examData);
  }

  /**
   * Ottiene la lista delle lezioni, eventualmente filtrate per anno corso.
   * @param anno Anno corso (opzionale) per filtrare le lezioni.
   * @returns Un'observable che emette un array di oggetti `Lezione`.
   */
  getLezioni(anno?: number): Observable<Lezione[]> {
    let params = new HttpParams();
    if (anno) {
      params = params.set('anno_corso', anno.toString());
    }
    return this.http.get<Lezione[]>(`${this.baseUrl}/lezioni/`, { params: params });
  }

  /**
   * Ottiene la lista delle lezioni per uno studente specifico.
   * @param email Email dello studente.
   * @returns Un'observable che emette un array di oggetti `any`.
   */
  getLezioniByStudentYear(email: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/lezioni/${email}/`).pipe(
      catchError((error) => {
        console.error('Errore durante il recupero delle lezioni:', error);
        return of(null);
      })
    );
  }
}
