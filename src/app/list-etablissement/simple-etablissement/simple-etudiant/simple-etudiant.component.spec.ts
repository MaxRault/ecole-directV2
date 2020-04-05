import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleEtudiantComponent } from './simple-etudiant.component';

describe('SimpleEtudiantComponent', () => {
  let component: SimpleEtudiantComponent;
  let fixture: ComponentFixture<SimpleEtudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleEtudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
