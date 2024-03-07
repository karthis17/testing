import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameingComponent } from './nameing.component';

describe('NameingComponent', () => {
  let component: NameingComponent;
  let fixture: ComponentFixture<NameingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NameingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
