import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserUpdateDialogComponent } from './user-update-dialog.component';

describe('UserUpdateDialogComponent', () => {
  let component: UserUpdateDialogComponent;
  let fixture: ComponentFixture<UserUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserUpdateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
