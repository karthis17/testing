import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryTumbnailComponent } from './category-tumbnail.component';

describe('CategoryTumbnailComponent', () => {
  let component: CategoryTumbnailComponent;
  let fixture: ComponentFixture<CategoryTumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryTumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryTumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
