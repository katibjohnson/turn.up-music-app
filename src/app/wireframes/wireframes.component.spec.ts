import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WireframesComponent } from './wireframes.component';

describe('WireframesComponent', () => {
  let component: WireframesComponent;
  let fixture: ComponentFixture<WireframesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WireframesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WireframesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
