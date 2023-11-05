import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorsiComponent } from './corsi.component';

describe('CorsiComponent', () => {
  let component: CorsiComponent;
  let fixture: ComponentFixture<CorsiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorsiComponent]
    });
    fixture = TestBed.createComponent(CorsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
