import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct icon name', () => {
    fixture.componentRef.setInput('icon', 'home');
    fixture.detectChanges();

    const iconEl = fixture.nativeElement.querySelector('[data-testid="icon"]');
    expect(iconEl.textContent.trim()).toBe('home');
  });

  it('should apply correct size, color and class', () => {
    fixture.componentRef.setInput('icon', 'search');
    fixture.componentRef.setInput('size', '36px');
    fixture.componentRef.setInput('color', 'blue');
    fixture.componentRef.setInput('class', 'icon-danger');
    fixture.detectChanges();

    const iconEl = fixture.nativeElement.querySelector('[data-testid="icon"]');
    const styles = window.getComputedStyle(iconEl);

    expect(styles.fontSize).toBe('36px');
    expect(styles.color).toBe('blue');
    expect(iconEl.getAttribute('class')).toContain('icon-danger');
  });
});
