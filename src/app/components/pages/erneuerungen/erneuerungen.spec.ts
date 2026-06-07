import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Erneuerungen } from './erneuerungen';

describe('Erneuerungen', () => {
  let component: Erneuerungen;
  let fixture: ComponentFixture<Erneuerungen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Erneuerungen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Erneuerungen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
