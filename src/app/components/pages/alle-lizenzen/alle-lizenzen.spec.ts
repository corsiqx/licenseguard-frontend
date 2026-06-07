import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlleLizenzen } from './alle-lizenzen';

describe('AlleLizenzen', () => {
  let component: AlleLizenzen;
  let fixture: ComponentFixture<AlleLizenzen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlleLizenzen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlleLizenzen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
