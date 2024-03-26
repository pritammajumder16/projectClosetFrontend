import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPagesComponent } from './info-pages.component';

describe('InfoPagesComponent', () => {
  let component: InfoPagesComponent;
  let fixture: ComponentFixture<InfoPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
