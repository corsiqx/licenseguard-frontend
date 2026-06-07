import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantEinstellungen } from './tenant-einstellungen';

describe('TenantEinstellungen', () => {
  let component: TenantEinstellungen;
  let fixture: ComponentFixture<TenantEinstellungen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenantEinstellungen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TenantEinstellungen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
