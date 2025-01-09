import { TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();
  });

  it('should create component', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const component = fixture.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should apply default type "primary"', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    const buttonEl = fixture.nativeElement.querySelector(
      '[data-testid="button"]'
    );

    fixture.detectChanges();

    expect(buttonEl.classList).toContain('primary');
  });

  it('should apply the correct type when type input is set', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('type', 'danger');

    fixture.detectChanges();

    const buttonEl = fixture.nativeElement.querySelector(
      '[data-testid="button"]'
    );

    fixture.detectChanges();

    expect(buttonEl.classList).toContain('danger');
    expect(buttonEl.classList).not.toContain('primary');
  });

  it('should set the button as disabled when disabled is true', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('disabled', true);
    const button = fixture.nativeElement.querySelector(
      '[data-testid="button"]'
    );

    fixture.detectChanges();

    expect(button.hasAttribute('disabled')).toBe(true);
  });

  it('should not disable the button when disabled is false', () => {
    const fixture = TestBed.createComponent(ButtonComponent);
    fixture.componentRef.setInput('disabled', false);
    const button = fixture.nativeElement.querySelector(
      '[data-testid="button"]'
    );

    fixture.detectChanges();

    expect(button.hasAttribute('disabled')).toBe(false);
  });
});
