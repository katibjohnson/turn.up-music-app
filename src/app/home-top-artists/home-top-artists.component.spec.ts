import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTopArtistsComponent } from './home-top-artists.component';

describe('HomeTopArtistsComponent', () => {
  let component: HomeTopArtistsComponent;
  let fixture: ComponentFixture<HomeTopArtistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTopArtistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTopArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
