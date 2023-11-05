export class Esame {
  id:number;
  nome: string;
  crediti: number;
  voto?: number;
  data_esame?: string;
  inEditMode?: boolean = false;


  constructor(id: number, nome: string, crediti: number, voto: number, data_esame: string) {
    this.id = id;
    this.nome = nome;
    this.crediti = crediti;
    this.voto = voto;
    this.data_esame = data_esame;
  }
  getFormattedDataEsame(): string {
    if (this.data_esame) {
      const dateParts = this.data_esame.split('-');
      if (dateParts.length === 3) {
        return `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
      }
    }
    return '';
  }

}

