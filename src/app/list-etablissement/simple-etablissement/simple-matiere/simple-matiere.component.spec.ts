import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleMatiereComponent } from './simple-matiere.component';

describe('SimpleMatiereComponent', () => {
  let component: SimpleMatiereComponent;
  let fixture: ComponentFixture<SimpleMatiereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleMatiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
