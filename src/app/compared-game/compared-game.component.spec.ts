import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparedGameComponent } from './compared-game.component';

describe('ComparedGameComponent', () => {
  let component: ComparedGameComponent;
  let fixture: ComponentFixture<ComparedGameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComparedGameComponent]
    });
    fixture = TestBed.createComponent(ComparedGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
