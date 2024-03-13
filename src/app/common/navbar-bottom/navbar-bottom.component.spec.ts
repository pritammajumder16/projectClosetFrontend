import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBottomComponent } from './navbar-bottom.component';

describe('NavbarBottomComponent', () => {
  let component: NavbarBottomComponent;
  let fixture: ComponentFixture<NavbarBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarBottomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
