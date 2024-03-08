import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestQuizzesComponent } from './contest-quizzes.component';

describe('ContestQuizzesComponent', () => {
  let component: ContestQuizzesComponent;
  let fixture: ComponentFixture<ContestQuizzesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContestQuizzesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContestQuizzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
