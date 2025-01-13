import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component with default values', () => {
    expect(component.type()).toBe('text');
    expect(component.placeholder()).toBe('');
    expect(component.disabled()).toBe(false);
    expect(component.value()).toBe('');
  });

  it('should write value correctly', () => {
    component.writeValue('test value');
    expect(component.value()).toBe('test value');
  });

  it('should update value on input change', () => {
    const inputEl = fixture.nativeElement.querySelector(
      '[data-testid="input"]'
    );
    inputEl.value = 'updated value';
    inputEl.dispatchEvent(new Event('input'));

    expect(component.value()).toBe('updated value');
  });

  it('should call onTouched on blur', () => {
    const onTouchedSpy = jest.fn();
    component.registerOnTouched(onTouchedSpy);

    const inputEl = fixture.nativeElement.querySelector(
      '[data-testid="input"]'
    );
    inputEl.dispatchEvent(new Event('blur'));

    expect(onTouchedSpy).toHaveBeenCalled();
  });

  it('should set disabled state', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    expect(component.disabled()).toBe(true);
  });

  it('should bind type correctly', () => {
    fixture.componentRef.setInput('type', 'email');
    fixture.detectChanges();

    const inputEl = fixture.nativeElement.querySelector(
      '[data-testid="input"]'
    );
    expect(inputEl.type).toBe('email');
  });

  it('should bind placeholder correctly', () => {
    fixture.componentRef.setInput('placeholder', 'placeholderTxt');
    fixture.detectChanges();

    const inputEl = fixture.nativeElement.querySelector(
      '[data-testid="input"]'
    );
    expect(inputEl.placeholder).toBe('placeholderTxt');
  });
});
