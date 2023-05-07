import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAddComponent } from './candidate-add.component';

describe('CandidateAddComponent', () => {
  let component: CandidateAddComponent;
  let fixture: ComponentFixture<CandidateAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidateAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidateAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
