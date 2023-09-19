import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateorderComponent } from './create-order.component';

describe('CreateOrderComponent', () => {
  let component: CreateorderComponent;
  let fixture: ComponentFixture<CreateorderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateorderComponent]
    });
    fixture = TestBed.createComponent(CreateorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
