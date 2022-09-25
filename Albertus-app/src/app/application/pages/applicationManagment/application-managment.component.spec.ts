import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationManagmentComponent } from './application-managment.component';

describe('ApplicationManagmentComponent', () => {
  let component: ApplicationManagmentComponent;
  let fixture: ComponentFixture<ApplicationManagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationManagmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
