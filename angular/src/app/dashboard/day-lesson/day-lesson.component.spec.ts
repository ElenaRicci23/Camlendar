import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayLessonComponent } from './day-lesson.component';

describe('DayLessonComponent', () => {
  let component: DayLessonComponent;
  let fixture: ComponentFixture<DayLessonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DayLessonComponent]
    });
    fixture = TestBed.createComponent(DayLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
