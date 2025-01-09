import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { CommonModule } from '@angular/common';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonComponent>;
  let component: ButtonComponent;
  let buttonEl: HTMLButtonElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    buttonEl = fixture.nativeElement.querySelector('[data-testid="button"]');
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should apply default type "primary"', () => {
    fixture.detectChanges();

    expect(buttonEl.classList).toContain('primary');
  });

  it('should apply the correct type when type input is set', () => {
    fixture.componentRef.setInput('type', 'danger');

    fixture.detectChanges();

    expect(buttonEl.classList).toContain('danger');
    expect(buttonEl.classList).not.toContain('primary');
  });

  it('should set the button as disabled when disabled is true', () => {
    fixture.componentRef.setInput('disabled', true);

    fixture.detectChanges();

    expect(buttonEl.hasAttribute('disabled')).toBe(true);
  });

  it('should not disable the button when disabled is false', () => {
    fixture.componentRef.setInput('disabled', false);

    fixture.detectChanges();

    expect(buttonEl.hasAttribute('disabled')).toBe(false);
  });
});
