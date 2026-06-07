import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Abteilungen } from './abteilungen';

describe('Abteilungen', () => {
  let component: Abteilungen;
  let fixture: ComponentFixture<Abteilungen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Abteilungen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Abteilungen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
