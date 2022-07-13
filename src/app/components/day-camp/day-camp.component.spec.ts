import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayCampComponent } from './day-camp.component';

describe('DayCampComponent', () => {
  let component: DayCampComponent;
  let fixture: ComponentFixture<DayCampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayCampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayCampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
