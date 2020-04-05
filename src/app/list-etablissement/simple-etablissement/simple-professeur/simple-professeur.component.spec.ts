import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleProfesseurComponent } from './simple-professeur.component';

describe('SimpleProfesseurComponent', () => {
  let component: SimpleProfesseurComponent;
  let fixture: ComponentFixture<SimpleProfesseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleProfesseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleProfesseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
