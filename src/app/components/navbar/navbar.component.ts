import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, LanguageSwitcherComponent],
  template: `
    <nav class="navbar" [class.scrolled]="isScrolled">
      <div class="container nav-content">
        <div class="logo" routerLink="/">
          TASAHIL<span>.</span>
        </div>

        <ul class="nav-links">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">{{ 'HOME' | translate }}</a></li>
          <li><a routerLink="/tours" routerLinkActive="active">{{ 'TOURS' | translate }}</a></li>
          <li><a routerLink="/contact" routerLinkActive="active">{{ 'CONTACT' | translate }}</a></li>
        </ul>

        <div class="nav-actions">
          <app-language-switcher></app-language-switcher>
          <button class="btn btn-primary btn-sm">{{ 'CONTACT' | translate }}</button>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      height: 80px;
      display: flex;
      align-items: center;
      transition: all 0.4s ease;
      background: transparent;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

      &.scrolled {
        background: rgba(17, 14, 53, 0.95);
        backdrop-filter: blur(14px);
        height: 72px;
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid rgba(255, 118, 38, 0.2);
      }
    }
    .nav-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .logo {
      font-size: 1.6rem;
      font-weight: 900;
      color: white;
      cursor: pointer;
      letter-spacing: -0.5px;
      span {
        color: var(--orange);
      }
    }
    .nav-links {
      display: flex;
      gap: 35px;
      li a {
        font-weight: 700;
        color: rgba(255, 255, 255, 0.85);
        font-size: 0.95rem;
        &:hover, &.active {
          color: var(--orange);
        }
      }
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 24px;
      color: white;
    }

    .btn-sm {
      padding: 10px 24px;
      font-size: 0.9rem;
    }

    @media (max-width: 992px) {
      .nav-links {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}
