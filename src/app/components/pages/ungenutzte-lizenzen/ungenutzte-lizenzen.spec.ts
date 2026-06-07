import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UngenutzteLizenzen } from './ungenutzte-lizenzen';

describe('UngenutzteLizenzen', () => {
  let component: UngenutzteLizenzen;
  let fixture: ComponentFixture<UngenutzteLizenzen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UngenutzteLizenzen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UngenutzteLizenzen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
