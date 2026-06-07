import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gruppen } from './gruppen';

describe('Gruppen', () => {
  let component: Gruppen;
  let fixture: ComponentFixture<Gruppen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gruppen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gruppen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
