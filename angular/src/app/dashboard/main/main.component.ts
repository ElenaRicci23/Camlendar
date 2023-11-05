import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {ApiService} from "../../service/api.service";
import {AuthService} from "../../service/auth.service";
import {Evento, Lezione} from "../../model/lezione";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  dayStartHour: number = 6;
  private email: string | undefined;

  constructor(
    private apiService: ApiService,private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.authService.getProfile().subscribe(profile => {
        this.email = profile.email;
        this.loadStudentLessons();
      });
    }
  }

  private loadStudentLessons(): void {
    if (this.email) {
      this.apiService.getLezioniByStudentYear(this.email).subscribe(data => {
        console.log('Raw API data:', data);
        if (data && Array.isArray(data)) {
          this.events = this.createRecurringEvents(data, 12);
          console.log('Mapped events:', this.events);
        }
      });
    }
  }

  private createRecurringEvents(lezioni: Lezione[], weeks: number): Evento[] {
    return lezioni.flatMap(lesson =>
      Array.from({ length: weeks }).map((_, i) => this.mapLezioneToEvent(lesson, i))
    );
  }

  private mapLezioneToEvent(lesson: Lezione, weekOffset: number): Evento {
    const startDate = this.getEventDate(lesson.giorno_settimana, lesson.orario_inizio, weekOffset);
    const endDate = this.getEventDate(lesson.giorno_settimana, lesson.orario_fine, weekOffset);

    return {
      start: startDate,
      end: endDate,
      title: `${lesson.corso.nome} - ${lesson.docente.nome} ${lesson.docente.cognome} - Aula: ${lesson.aula}-Link: ${lesson.docente.link}`,
    };
  }

  private getEventDate(dayOfWeek: string, time: string, weekOffset: number): Date {
    const dayMapping: { [key: string]: number } = {
      'D': 0, 'L': 1, 'M': 2, 'ME': 3, 'G': 4, 'V': 5, 'S': 6
    };
    const currentDate = new Date();
    const [hours, minutes] = time.split(':').map(Number);
    const targetDayIndex = dayMapping[dayOfWeek];
    const currentDayIndex = currentDate.getDay();
    const daysUntilTarget = (targetDayIndex + 7 - currentDayIndex) % 7;
    const targetDate = new Date(currentDate);
    targetDate.setDate(targetDate.getDate() + daysUntilTarget + (weekOffset * 7));
    targetDate.setHours(hours, minutes, 0, 0);
    return targetDate;
  }

  CalendarView = CalendarView;


}
