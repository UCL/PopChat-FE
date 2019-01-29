import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchSignupComponent } from './batch-signup.component';

describe('BatchSignupComponent', () => {
  let component: BatchSignupComponent;
  let fixture: ComponentFixture<BatchSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatchSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BatchSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
