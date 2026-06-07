import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Zuweisungen } from './zuweisungen';

describe('Zuweisungen', () => {
  let component: Zuweisungen;
  let fixture: ComponentFixture<Zuweisungen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Zuweisungen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Zuweisungen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
