import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let formControl: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    formControl = new FormControl(false);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle boolean value correctly', () => {
    expect(component.value).toBe(false);

    component.toggle();

    expect(component.value).toBe(true);

    component.toggle();

    expect(component.value).toBe(false);
  });

  it('should toggle between custom true and false values', () => {
    fixture.componentRef.setInput('trueValue', 'active');
    fixture.componentRef.setInput('falseValue', 'inactive');

    expect(component.value).toBe('active');

    component.toggle();

    expect(component.value).toBe('inactive');

    component.toggle();

    expect(component.value).toBe('active');
  });

  it('should have disabled state when form control is disabled', () => {
    formControl.disable();
    fixture.detectChanges();

    const checkboxEl = fixture.nativeElement.querySelector(
      '[data-testid="checkbox"]'
    );

    expect(component.isDisabled).toBe(true);
    expect(checkboxEl.disabled).toBe(true);
  });

  it('should bind the label correctly', () => {
    fixture.componentRef.setInput('labelTxt', 'Custom Label');
    fixture.detectChanges();

    const labelEl = fixture.nativeElement.querySelector(
      '[data-testid="checkbox-label"]'
    );

    expect(labelEl.textContent.trim()).toBe('Custom Label');
  });

  it('should bind id correctly', () => {
    fixture.componentRef.setInput('id', 'test-id');
    fixture.detectChanges();

    const checkboxEl = fixture.nativeElement.querySelector(
      '[data-testid="checkbox"]'
    );
    expect(checkboxEl.id).toBe('custom-checkbox');
  });
});
