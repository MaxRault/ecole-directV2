import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleEtablissementComponent } from './simple-etablissement.component';

describe('SimpleEtablissementComponent', () => {
  let component: SimpleEtablissementComponent;
  let fixture: ComponentFixture<SimpleEtablissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleEtablissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleEtablissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
