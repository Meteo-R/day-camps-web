import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayCampsComponent } from './day-camps.component';

describe('DayCampsComponent', () => {
  let component: DayCampsComponent;
  let fixture: ComponentFixture<DayCampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayCampsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayCampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
