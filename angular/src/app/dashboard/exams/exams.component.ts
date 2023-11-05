// src/app/exams/exams.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Esame} from "../../model/esame";
import {ApiService} from "../../service/api.service";
import {AuthService} from "../../service/auth.service";


@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css']
})
export class ExamsComponent implements OnInit {
  esami: Esame[] = [];
  editForm: FormGroup;

  constructor(
    private apiService: ApiService, private authService: AuthService, private formBuilder: FormBuilder
  ) {
    this.editForm = this.formBuilder.group({
      nuovoVoto: ['', [Validators.required, Validators.min(18), Validators.max(30)]],
      nuovaData: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.getProfile().subscribe(profile => {
          const userEmail = profile.email; // Ottieni l'email dall'oggetto di profilo
          if (userEmail) {
            this.apiService.getEsami(userEmail).subscribe(
              data => {
                this.esami = data;
              },
              error => {
                console.error('Errore durante il recupero degli esami:', error);
              }
            );
          }
        },
        error => {
          console.error('Errore durante il recupero del profilo utente:', error);
        }
      );
    } else {
      console.error('Utente non autenticato.');
    }
  }

  editEsame(esame: Esame): void {
    const examData = {
      voto: esame.voto,
      data_esame: esame.data_esame
    };

    this.authService.getProfile().subscribe(profile => {
      const userEmail = profile.email;
      if (userEmail) {
        this.apiService.updateExamScore(userEmail, esame.id, examData)
          .subscribe(
            response => {
              console.log(response);
              esame.inEditMode = false; // chiudi il form di modifica dopo l'aggiornamento
            },
            error => {
              console.error(error);
              // gestisci gli errori qui
            }
          );
      } else {
        console.error('Email utente non disponibile per l\'aggiornamento del voto.');
      }
    });
  }
}



