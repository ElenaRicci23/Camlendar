// src/app/models/docente.model.ts

export class Docente {
  id: number;
  nome: string;
  cognome: string;
  email: string;
  link: string;
  dipartimento: string;

  constructor(
    id: number,
    nome: string,
    cognome: string,
    email: string,
    link: string,
    dipartimento: string
  ) {
    this.id = id;
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.link = link;
    this.dipartimento = dipartimento;
  }
}
