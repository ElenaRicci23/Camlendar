  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { CalendarModule, DateAdapter } from 'angular-calendar';
  import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
  import { HttpClientModule } from '@angular/common/http';
  import {SchedulerComponent} from "./scheduler.component";
  import {DayLessonComponent} from "../day-lesson/day-lesson.component";
import { format, addDays } from 'date-fns';


  @NgModule({
    declarations: [
      SchedulerComponent,
          DayLessonComponent,

    ],
    imports: [
      CommonModule,
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
      HttpClientModule
    ],
    exports: [
      SchedulerComponent,
          DayLessonComponent,


    ],
  })
  export class SchedulerModule { }
