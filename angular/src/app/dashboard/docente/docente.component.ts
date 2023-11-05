import { Component, OnInit } from '@angular/core';
import {Docente} from "../../model/docente";
import {ApiService} from "../../service/api.service";
import {AuthService} from "../../service/auth.service";


@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  docenti: Docente[] = []; // Array che conterrà i docenti
  selectedYear: string = 'tutti'; // Anno selezionato (impostato su 'tutti' di default)

  constructor(private apiService: ApiService, private authService: AuthService) {}

  ngOnInit() {
    this.updateDocenti(); // Chiama il metodo per caricare i docenti all'avvio del componente
  }

  // Gestisce il cambio di anno selezionato
  onYearChange() {
    this.updateDocenti();
  }

  // Aggiorna la lista dei docenti in base all'anno selezionato
  private updateDocenti() {
    if (this.authService.isAuthenticated()) {
      if (this.selectedYear === 'tutti') {
        this.apiService.getDocenti().subscribe((data: Docente[]) => {
          this.docenti = data;
        });
      } else {
        let yearFilter = this.selectedYear;
        this.apiService.getDocentiPerAnno(yearFilter).subscribe((data: Docente[]) => {
          this.docenti = data;
        });
      }
    }
  }
}
