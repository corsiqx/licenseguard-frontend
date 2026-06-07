import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KostenBudget } from './kosten-budget';

describe('KostenBudget', () => {
  let component: KostenBudget;
  let fixture: ComponentFixture<KostenBudget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KostenBudget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KostenBudget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
