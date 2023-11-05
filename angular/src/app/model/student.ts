

export class Student{
  nome: string;
  cognome: string;
  email: string;
  gender: string;
  anno_accademico: number = 0; // Inizializzato a un valore predefinito
  password?: string;
  token?: string;  // Aggiungi questa proprietà per gestire il token JWT

  constructor() {
    this.nome = "";
    this.cognome = "";
    this.email = "";
    this.gender = "";
  }
}
