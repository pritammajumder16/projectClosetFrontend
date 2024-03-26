import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPagesDisplayComponent } from './info-pages-display.component';

describe('InfoPagesDisplayComponent', () => {
  let component: InfoPagesDisplayComponent;
  let fixture: ComponentFixture<InfoPagesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoPagesDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoPagesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
