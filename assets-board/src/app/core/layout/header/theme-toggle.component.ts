import { Component } from '@angular/core';

@Component({
  selector: 'lab-theme-toggle',
  template: `
    <a aria-label="Toggle theme">
      <span (click)="toggleTheme()">
        @if (theme == 'light') { 🔳 } @if (theme == 'dark') { 🔲 }
      </span>
    </a>
  `,
  standalone: true,
})
export class ThemeToggleComponent {
  protected theme = localStorage.getItem('theme') || 'light';
  protected toggleTheme(): void {
    if (this.theme === 'light') {
      this.theme = 'dark';
    } else {
      this.theme = 'light';
    }
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }
}
