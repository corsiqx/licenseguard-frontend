import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Anbieter } from './anbieter';

describe('Anbieter', () => {
  let component: Anbieter;
  let fixture: ComponentFixture<Anbieter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Anbieter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Anbieter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
