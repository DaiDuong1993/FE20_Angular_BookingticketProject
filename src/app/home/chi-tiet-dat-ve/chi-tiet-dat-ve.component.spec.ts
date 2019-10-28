import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiTietDatVeComponent } from './chi-tiet-dat-ve.component';

describe('ChiTietDatVeComponent', () => {
  let component: ChiTietDatVeComponent;
  let fixture: ComponentFixture<ChiTietDatVeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiTietDatVeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiTietDatVeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
