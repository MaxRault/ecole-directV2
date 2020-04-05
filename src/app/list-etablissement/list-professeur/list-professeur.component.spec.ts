import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfesseurComponent } from './list-professeur.component';

describe('ListProfesseurComponent', () => {
  let component: ListProfesseurComponent;
  let fixture: ComponentFixture<ListProfesseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProfesseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
