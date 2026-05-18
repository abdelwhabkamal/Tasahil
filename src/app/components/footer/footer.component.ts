import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-info">
            <div class="logo">TASAHIL<span>.</span></div>
            <p>شريكك التعليمي الأول في تركيا. نحن نساعدك في بناء مستقبلك الأكاديمي من خلال أفضل الجامعات التركية المعتمدة.</p>
            <div class="social-links">
              <a href="#"><i class="fab fa-facebook"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
            </div>
          </div>

          <div class="footer-links">
            <h4>روابط سريعة</h4>
            <ul>
              <li><a routerLink="/">{{ 'HOME' | translate }}</a></li>
              <li><a routerLink="/tours">{{ 'TOURS' | translate }}</a></li>
              <li><a routerLink="/contact">{{ 'CONTACT' | translate }}</a></li>
            </ul>
          </div>

          <div class="footer-newsletter">
            <h4>تواصل معنا</h4>
            <p>ابق على اطلاع بأحدث المنح الجامعية والقبولات في تركيا.</p>
            <div class="newsletter-form">
              <input type="email" placeholder="البريد الإلكتروني">
              <button class="btn btn-primary btn-sm">اشترك</button>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; 2026 Tasahil Education. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--navy-dark);
      color: white;
      padding: 80px 0 30px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1.5fr;
      gap: 60px;
      margin-bottom: 60px;
    }
    .logo {
      font-size: 1.8rem;
      font-weight: 900;
      margin-bottom: 25px;
      span { color: var(--orange); }
    }
    .footer-info p {
      opacity: 0.7;
      margin-bottom: 25px;
      max-width: 350px;
      font-weight: 600;
      line-height: 1.8;
    }
    .social-links {
      display: flex;
      gap: 15px;
      a {
        width: 45px;
        height: 45px;
        background: rgba(255,255,255,0.05);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        transition: all 0.3s ease;
        border: 1px solid rgba(255,255,255,0.1);
        &:hover {
          background: var(--orange);
          border-color: var(--orange);
          transform: translateY(-3px);
        }
      }
    }
    h4 { font-size: 1.2rem; font-weight: 800; margin-bottom: 30px; color: var(--orange); }
    .footer-links ul {
      display: flex;
      flex-direction: column;
      gap: 15px;
      li a {
        opacity: 0.7;
        font-weight: 600;
        &:hover { opacity: 1; color: var(--orange); }
      }
    }
    .footer-newsletter p { opacity: 0.7; margin-bottom: 25px; font-weight: 600; }
    .newsletter-form {
      display: flex;
      gap: 12px;
      input {
        flex-grow: 1;
        padding: 12px 20px;
        border-radius: 10px;
        border: 1px solid rgba(255,255,255,0.1);
        background: rgba(255,255,255,0.05);
        color: white;
        font-family: inherit;
        &:focus { outline: none; border-color: var(--orange); }
      }
      .btn-sm { padding: 12px 25px; font-size: 0.9rem; border-radius: 10px; }
    }
    .footer-bottom {
      padding-top: 30px;
      border-top: 1px solid rgba(255,255,255,0.05);
      text-align: center;
      p { opacity: 0.5; font-size: 0.9rem; font-weight: 600; }
    }

    @media (max-width: 992px) {
      .footer-grid { grid-template-columns: 1fr; gap: 40px; }
    }
  `]
})
export class FooterComponent {}
