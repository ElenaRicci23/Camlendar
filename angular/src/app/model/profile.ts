export class Profile {
  nome: string;
  cognome: string;
  email: string;
  anno_accademico: number;
  corsi: any[];  // Modificare il tipo in base ai dati effettivi dei corsi


  constructor(nome: string, cognome: string, email: string, anno_accademico: number, corsi: any[]) {
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.anno_accademico = anno_accademico;
    this.corsi = corsi;
  }
}
