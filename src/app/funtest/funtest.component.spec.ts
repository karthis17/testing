import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuntestComponent } from './funtest.component';

describe('FuntestComponent', () => {
  let component: FuntestComponent;
  let fixture: ComponentFixture<FuntestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FuntestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FuntestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
