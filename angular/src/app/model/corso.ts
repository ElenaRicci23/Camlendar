// corsi.model.ts


import {Docente} from "./docente";

export class Corso {
  id: number;
  docente: Docente;
  nome: string;
  semestre: number;
  anno: string;
  crediti: number;

  constructor(
    id: number,
    docente: Docente,
    nome: string,
    semestre: number,
    anno: string,
    crediti: number
  ) {
    this.id = id;
    this.docente = docente;
    this.nome = nome;
    this.semestre = semestre;
    this.anno = anno;
    this.crediti = crediti;
  }
}
