import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDrawersComponent } from './filter-drawers.component';

describe('FilterDrawersComponent', () => {
  let component: FilterDrawersComponent;
  let fixture: ComponentFixture<FilterDrawersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterDrawersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterDrawersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
