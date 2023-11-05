export interface Docente {
  id?: number;
  nome: string;
  cognome: string;
  email: string;
  link?: string;
  dipartimento: string;
}

export interface Corso {
  description: any;
  id?: number;
  nome: string;
  semestre: number;
  anno: string;
  crediti: number;
  docente: Docente;
}

export interface Lezione {
  id?: number;
  giorno_settimana: string;
  orario_inizio: string;
  orario_fine: string;
  aula: string;
  corso: Corso;
  docente: Docente;
}
export interface Evento {
  title: string;         // Titolo dell'evento (es. "Lezione di Matematica")
  start: Date;           // Data e ora di inizio dell'evento
  end: Date;             // Data e ora di fine dell'evento
  allDay?: boolean;      // Indica se l'evento dura tutto il giorno
  description?: string;  // Descrizione dell'evento (es. "Logica")
  docente?: string;      // Nome del docente (es. "Sonia Dell'Innocente")
  aula?: string;         // Nome dell'aula (es. "Aula 101")
  docenteLink?: string;  // Link al profilo del docente
}
