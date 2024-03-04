import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralQuestionComponent } from './general-question.component';

describe('GeneralQuestionComponent', () => {
  let component: GeneralQuestionComponent;
  let fixture: ComponentFixture<GeneralQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralQuestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GeneralQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
