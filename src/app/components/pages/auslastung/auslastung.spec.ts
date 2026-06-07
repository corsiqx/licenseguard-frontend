import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Auslastung } from './auslastung';

describe('Auslastung', () => {
  let component: Auslastung;
  let fixture: ComponentFixture<Auslastung>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Auslastung]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Auslastung);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
