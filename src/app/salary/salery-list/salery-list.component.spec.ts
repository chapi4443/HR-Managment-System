import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleryListComponent } from './salery-list.component';

describe('SaleryListComponent', () => {
  let component: SaleryListComponent;
  let fixture: ComponentFixture<SaleryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleryListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
