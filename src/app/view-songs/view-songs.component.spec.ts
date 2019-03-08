import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSongsComponent } from './view-songs.component';

describe('ViewSongsComponent', () => {
  let component: ViewSongsComponent;
  let fixture: ComponentFixture<ViewSongsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSongsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
