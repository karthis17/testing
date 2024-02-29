import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PercentageTypeComponent } from './percentage-type.component';

describe('PercentageTypeComponent', () => {
  let component: PercentageTypeComponent;
  let fixture: ComponentFixture<PercentageTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PercentageTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PercentageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
