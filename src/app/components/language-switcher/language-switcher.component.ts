import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="lang-switcher">
      <button 
        (click)="switchLang('en')" 
        [class.active]="translate.currentLang === 'en'"
        class="lang-btn">
        EN
      </button>
      <span class="divider">|</span>
      <button 
        (click)="switchLang('ar')" 
        [class.active]="translate.currentLang === 'ar'"
        class="lang-btn">
        AR
      </button>
    </div>
  `,
  styles: [`
    .lang-switcher {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
    }
    .lang-btn {
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
      font-family: inherit;
      font-size: 0.9rem;
      padding: 4px 8px;
      border-radius: 4px;
      transition: all 0.2s ease;
      
      &:hover {
        color: var(--primary);
      }
      
      &.active {
        color: white;
        background-color: var(--primary);
      }
    }
    .divider {
      opacity: 0.3;
    }
  `]
})
export class LanguageSwitcherComponent {
  translate = inject(TranslateService);

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
