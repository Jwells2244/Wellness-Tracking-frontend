import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private isDark = false;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.loadSavedTheme();
  }

  private loadSavedTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.enableDarkMode();
    } else {
      this.disableDarkMode(); // default to light
    }
  }

  toggleTheme(): void {
    this.isDark ? this.disableDarkMode() : this.enableDarkMode();
  }

  enableDarkMode(): void {
    requestAnimationFrame(() => {
      this.renderer.addClass(document.body, 'dark-theme');
    });
    console.log('🌙 Dark mode enabled');
    localStorage.setItem('theme', 'dark');
    this.isDark = true;
  }
  
  disableDarkMode(): void {
    requestAnimationFrame(() => {
      this.renderer.removeClass(document.body, 'dark-theme');
    });
    console.log('☀️ Light mode enabled');
    localStorage.setItem('theme', 'light');
    this.isDark = false;
  }
  
  

  isDarkMode(): boolean {
    return this.isDark;
  }
}
