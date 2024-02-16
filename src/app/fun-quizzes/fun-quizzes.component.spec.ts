import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunQuizzesComponent } from './fun-quizzes.component';

describe('FunQuizzesComponent', () => {
  let component: FunQuizzesComponent;
  let fixture: ComponentFixture<FunQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FunQuizzesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FunQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
