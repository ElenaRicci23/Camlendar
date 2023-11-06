import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { ApiService } from '../../service/api.service';
import {AuthService} from "../../service/auth.service";
import {Lezione} from "../../model/lezione";
import { format, addDays } from 'date-fns';

@Component({
  selector: 'app-day-lesson',
  templateUrl: './day-lesson.component.html',
  styleUrls: ['./day-lesson.component.css']
})
export class DayLessonComponent implements OnInit {
  events: CalendarEvent[] = []; // Dichiarazione dell'array di eventi
  viewDate: Date = new Date(); // Inizializzazione della data di visualizzazione
  dayStartHour: number = 6; // Inizializzazione dell'ora di inizio giornata
  hourSegmentHeight: number = 60; // Altezza del segmento orario (puoi regolarla in base alle tue esigenze)
  refresh: any;

  constructor(
    private apiService:ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.getProfile().subscribe(profile => {
        const userEmail = profile.email; // Ottieni l'email dall'oggetto di profilo
        if (userEmail) {
          this.apiService.getLezioniByStudentYear(userEmail).subscribe(data => {
            if (data && Array.isArray(data)) {
              this.events = this.createEventsForDay(data); // Eventi solo per un giorno
            }
          });
        }
      });
    }
  }

  private createEventsForDay(lezioni: Lezione[]): CalendarEvent[] {
    const events: CalendarEvent[] = [];

    lezioni.forEach(lesson => {
      const event: CalendarEvent = {
        start: this.convertToEventDate(lesson.giorno_settimana, lesson.orario_inizio),
        end: this.convertToEventDate(lesson.giorno_settimana, lesson.orario_fine),
        title: `${lesson.corso.nome} - ${lesson.docente.nome} ${lesson.docente.cognome} - Aula: ${lesson.aula}-Link: ${lesson.docente.link}`,
      };

      events.push(event);
    });

    return events;
  }

  private convertToEventDate(dayOfWeek: string, time: string): Date {
    const dayMapping: { [key: string]: number } = {
      'D': 0, 'L': 1, 'M': 2, 'ME': 3, 'G': 4, 'V': 5, 'S': 6
    };
    const currentDate = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const targetDayIndex = dayMapping[dayOfWeek];
    const currentDayIndex = currentDate.getDay();
    const daysUntilTarget = (targetDayIndex + 7 - currentDayIndex) % 7;
    const targetDate = new Date(currentDate);
    targetDate.setDate(targetDate.getDate() + daysUntilTarget);
    targetDate.setHours(hours, minutes, 0, 0);
    return targetDate;
  }


}
