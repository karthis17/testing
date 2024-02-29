import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomTextComponent } from './random-text.component';

describe('RandomTextComponent', () => {
  let component: RandomTextComponent;
  let fixture: ComponentFixture<RandomTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RandomTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
