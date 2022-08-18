import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDayCampsComponent } from './my-day-camps.component';

describe('MyDayCampsComponent', () => {
  let component: MyDayCampsComponent;
  let fixture: ComponentFixture<MyDayCampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDayCampsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDayCampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
