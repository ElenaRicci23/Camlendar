import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../service/api.service";
import {AuthService} from "../../service/auth.service";
import {Evento, Lezione} from "../../model/lezione";
import { CalendarEvent, CalendarView } from 'angular-calendar';


@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  dayStartHour: number = 6;

  constructor(private apiService: ApiService, private authService: AuthService) {
  }


  ngOnInit(): void {
    // Verifica se l'utente è autenticato prima di caricare le lezioni
    if (this.authService.isAuthenticated()) {
      this.apiService.getLezioni().subscribe(data => {
        if (data && Array.isArray(data)) {
          this.events = this.createRecurringEvents(data, 12); // 12 weeks of repetition
        }
      });
    }
  }

  // Creazione di eventi ricorrenti basati sulle lezioni
  private createRecurringEvents(lezioni: Lezione[], weeks: number): Evento[] {
    let events: Evento[] = [];

    lezioni.forEach(lesson => {
      for (let i = 0; i < weeks; i++) {
        const startDate = this.convertToEventDate(lesson.giorno_settimana, lesson.orario_inizio);
        const endDate = this.convertToEventDate(lesson.giorno_settimana, lesson.orario_fine);

        // Sposta l'evento in avanti di i settimane
        startDate.setDate(startDate.getDate() + (i * 7));
        endDate.setDate(endDate.getDate() + (i * 7));

        const event: Evento = {
          start: startDate,
          end: endDate,
          title: `${lesson.corso.nome} - ${lesson.docente.nome} ${lesson.docente.cognome} - Aula: ${lesson.aula}-Link: ${lesson.docente.link}`,
        };

        events.push(event);
      }
    });

    return events;
  }



  // Converte il giorno della settimana e l'orario in una data dell'evento
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

  // Imposta la vista del calendario
  setView(view: CalendarView): void {
    this.view = view;
  }

  CalendarView = CalendarView;

  // Naviga tra i mesi, le settimane o i giorni nel calendario
  navigate(direction: string): void {
    const amount = direction === 'next' ? 1 : -1;
    switch (this.view) {
      case CalendarView.Month:
        this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + amount, this.viewDate.getDate());
        break;
      case CalendarView.Week:
        this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate() + (7 * amount));
        break;
      case CalendarView.Day:
        this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth(), this.viewDate.getDate() + amount);
        break;
    }
  }

  // Filtra le lezioni per anno
  filterYear(year: number): void {
    this.apiService.getLezioni(year).subscribe(data => {
      if (data && Array.isArray(data)) {
        this.events = this.createRecurringEvents(data, 12);
      }
    });
  }
}

