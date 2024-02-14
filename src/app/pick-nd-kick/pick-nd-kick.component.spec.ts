import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickNdKickComponent } from './pick-nd-kick.component';

describe('PickNdKickComponent', () => {
  let component: PickNdKickComponent;
  let fixture: ComponentFixture<PickNdKickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickNdKickComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PickNdKickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
