import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollChildComponent } from './enroll-child.component';

describe('EnrollChildComponent', () => {
  let component: EnrollChildComponent;
  let fixture: ComponentFixture<EnrollChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
