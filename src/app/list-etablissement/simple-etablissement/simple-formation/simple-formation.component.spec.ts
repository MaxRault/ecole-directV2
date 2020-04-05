import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleFormationComponent } from './simple-formation.component';

describe('SimpleFormationComponent', () => {
  let component: SimpleFormationComponent;
  let fixture: ComponentFixture<SimpleFormationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleFormationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
