import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPoAllComponent } from './view-po-all.component';

describe('ViewPoAllComponent', () => {
  let component: ViewPoAllComponent;
  let fixture: ComponentFixture<ViewPoAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPoAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPoAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
