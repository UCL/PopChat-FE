import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongHeadlineComponent } from './song-headline.component';

describe('SongHeadlineComponent', () => {
  let component: SongHeadlineComponent;
  let fixture: ComponentFixture<SongHeadlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongHeadlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongHeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
