import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { UniversityService, University } from '../../services/university.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TranslateModule, NavbarComponent, FooterComponent, RouterModule],
  template: `
    <app-navbar></app-navbar>

    <main>
      <!-- Hero Section -->
      <section class="hero flex-center">
        <div class="hero-overlay"></div>
        <div class="container hero-container fade-in-up">
          <div class="hero-badge">
            <i class="fas fa-graduation-cap"></i>
            ادرس في أفضل جامعات تركيا
          </div>

          <h1 class="hero-title">
            ابدأ مستقبلك الأكاديمي <br>
            في <span>أفضل جامعات تركيا</span>
          </h1>

          <div class="lead-card glass">
            <h2 class="lead-title">سجل الآن للحصول على استشارة مجانية</h2>
            <form class="lead-form">
              <div class="form-row">
                <input type="text" placeholder="الاسم الكامل" class="hero-input">
                <input type="tel" placeholder="رقم الهاتف" class="hero-input">
              </div>
              <button class="btn btn-primary w-100">ابدأ رحلتك الآن</button>
            </form>
          </div>

          <p class="hero-trust">أكثر من 1500 طالب بدأوا رحلتهم معنا بنجاح</p>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-section">
        <div class="container stats-grid">
          <div class="stat-item">
            <span class="stat-number">1500+</span>
            <span class="stat-label">طالب مسجل</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">40+</span>
            <span class="stat-label">جامعة معتمدة</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">15+</span>
            <span class="stat-label">سنة خبرة</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">100%</span>
            <span class="stat-label">قبول جامعي</span>
          </div>
        </div>
      </section>

      <!-- Universities Section -->
      <section class="section-padding">
        <div class="container">
          <div class="text-center">
            <span class="section-tag">الجامعات</span>
            <h2 class="section-title">اختر جامعتك من <span>أفضل الجامعات التركية</span></h2>
            <p class="section-subtitle">نحن نساعدك في الحصول على قبول في أفضل الجامعات التركية الخاصة والمعتمدة دولياً</p>
          </div>

          <div class="grid" *ngIf="universities$ | async as universities">
            <div class="uni-card glass hover-lift" *ngFor="let uni of universities">
              <div class="uni-logo-wrapper">
                <div class="uni-logo-placeholder">
                  <i class="fas fa-university fa-2x"></i>
                </div>
              </div>
              <div class="uni-content">
                <h3>{{ uni.name }}</h3>
                <div class="uni-tags">
                  <span class="tag">{{ uni.location }}</span>
                  <span class="tag">{{ uni.type }}</span>
                </div>
                <div class="uni-meta">
                  <span>من {{ uni.price | currency:'USD':'symbol':'1.0-0' }} / سنوياً</span>
                </div>
                <div class="uni-actions">
                  <button class="btn btn-navy btn-sm" [routerLink]="['/tours', uni.id]">التفاصيل</button>
                  <button class="btn btn-primary btn-sm" [routerLink]="['/tours', uni.id]">سجل الآن</button>
                </div>
              </div>
            </div>
          </div>

          <div class="text-center mt-50">
            <button class="btn btn-outline" routerLink="/tours">عرض جميع الجامعات</button>
          </div>
        </div>
      </section>

      <!-- Steps Section -->
      <section class="steps-section section-padding">
        <div class="container text-center">
          <span class="section-tag">رحلتك معنا</span>
          <h2 class="section-title text-white">خطواتك إلى <span>التفوق الجامعي</span></h2>

          <div class="steps-grid">
            <div class="step-item">
              <div class="step-icon"><i class="fas fa-headset"></i></div>
              <h4>استشارة مجانية</h4>
              <p>تواصل معنا للحصول على استشارة تعليمية شاملة</p>
            </div>
            <div class="step-item">
              <div class="step-icon"><i class="fas fa-file-alt"></i></div>
              <h4>تجهيز الأوراق</h4>
              <p>نساعدك في جمع وترجمة كافة الأوراق المطلوبة</p>
            </div>
            <div class="step-item">
              <div class="step-icon"><i class="fas fa-university"></i></div>
              <h4>التقديم للجامعة</h4>
              <p>نضمن لك الحصول على قبول جامعي سريع</p>
            </div>
            <div class="step-item">
              <div class="step-icon"><i class="fas fa-id-card"></i></div>
              <h4>الإقامة والتسجيل</h4>
              <p>نرافقك في كافة إجراءات التسجيل النهائي والإقامة</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Why Us Section -->
      <section class="section-padding bg-off-white">
        <div class="container">
          <div class="text-center">
            <span class="section-tag">لماذا نحن؟</span>
            <h2 class="section-title">نحن لسنا مجرد وسيط — <span>نحن شريكك</span></h2>
          </div>

          <div class="features-grid">
            <div class="feature-item glass-white">
              <i class="fas fa-check-circle"></i>
              <h4>وكيل رسمي ومعتمد</h4>
              <p>نحن وكلاء رسميون لأفضل الجامعات التركية</p>
            </div>
            <div class="feature-item glass-white">
              <i class="fas fa-user-graduate"></i>
              <h4>دعم طلابي متواصل</h4>
              <p>نقدم الدعم لطلابنا طوال فترة دراستهم</p>
            </div>
            <div class="feature-item glass-white">
              <i class="fas fa-percentage"></i>
              <h4>خصومات حصرية</h4>
              <p>احصل على خصومات تصل إلى 50% من الرسوم الدراسية</p>
            </div>
          </div>
        </div>
      </section>

      <!-- WhatsApp Button -->
      <a href="https://wa.me/yournumber" class="whatsapp-float" target="_blank">
        <i class="fab fa-whatsapp"></i>
      </a>
    </main>

    <app-footer></app-footer>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 100vh;
      background: url('https://images.unsplash.com/photo-1541339907198-e08756eaa589?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;
      display: flex;
      align-items: center;
      padding-top: 80px;
      color: white;
      text-align: center;

      .hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(135deg, rgba(28, 23, 74, 0.95), rgba(17, 14, 53, 0.8));
      }

      .hero-container {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255, 118, 38, 0.2);
      border: 1px solid var(--orange);
      color: var(--orange-light);
      padding: 8px 24px;
      border-radius: 50px;
      font-weight: 800;
      font-size: 0.9rem;
      margin-bottom: 30px;
    }

    .hero-title {
      font-size: clamp(2.2rem, 6vw, 4.2rem);
      font-weight: 900;
      line-height: 1.1;
      margin-bottom: 40px;
      span { color: var(--orange); }
    }

    .lead-card {
      width: 100%;
      max-width: 600px;
      padding: 40px;
      margin-bottom: 30px;
      .lead-title {
        font-size: 1.2rem;
        font-weight: 800;
        margin-bottom: 25px;
      }
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-bottom: 15px;
    }

    .hero-input {
      width: 100%;
      padding: 14px 20px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-family: inherit;
      &::placeholder { color: rgba(255, 255, 255, 0.6); }
      &:focus { outline: none; border-color: var(--orange); }
    }

    .hero-trust {
      font-size: 0.95rem;
      opacity: 0.7;
      font-weight: 600;
    }

    .stats-section {
      background: var(--navy-dark);
      padding: 40px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
      }
      .stat-item {
        text-align: center;
        color: white;
        .stat-number {
          display: block;
          font-size: 2.2rem;
          font-weight: 900;
          color: var(--orange);
        }
        .stat-label {
          font-size: 0.9rem;
          opacity: 0.7;
          font-weight: 700;
        }
      }
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 30px;
    }

    .uni-card {
      padding: 30px;
      text-align: center;
      border-color: rgba(28, 23, 74, 0.1) !important;
      background: white !important;
      color: var(--navy);
      .uni-logo-wrapper {
        height: 100px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        .uni-logo-placeholder {
          width: 80px;
          height: 80px;
          background: var(--off-white);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
          color: var(--gray-text);
        }
      }
      h3 { font-size: 1.3rem; font-weight: 800; margin-bottom: 15px; }
      .uni-tags {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 15px;
        .tag {
          background: var(--off-white);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
        }
      }
      .uni-meta {
        font-weight: 800;
        color: var(--orange);
        margin-bottom: 20px;
      }
      .uni-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
    }

    .steps-section {
      background: var(--navy);
      color: white;
      .steps-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 40px;
        margin-top: 60px;
      }
      .step-item {
        .step-icon {
          width: 70px;
          height: 70px;
          background: var(--orange-glow);
          border: 1px solid var(--orange);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: var(--orange);
          margin: 0 auto 20px;
        }
        h4 { font-size: 1.2rem; font-weight: 800; margin-bottom: 10px; }
        p { font-size: 0.9rem; opacity: 0.7; }
      }
    }

    .bg-off-white { background-color: var(--off-white); }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
    }

    .feature-item {
      padding: 40px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.03);
      text-align: center;
      i { font-size: 2.5rem; color: var(--orange); margin-bottom: 20px; }
      h4 { font-size: 1.3rem; font-weight: 800; margin-bottom: 15px; }
      p { color: var(--gray-text); font-size: 0.95rem; }
    }

    .mt-50 { margin-top: 50px; }
    .w-100 { width: 100%; }

    @media (max-width: 992px) {
      .stats-grid, .steps-grid { grid-template-columns: 1fr 1fr; }
      .features-grid { grid-template-columns: 1fr; }
    }

    @media (max-width: 576px) {
      .form-row { grid-template-columns: 1fr; }
      .stats-grid, .steps-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class HomeComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private universityService = inject(UniversityService);

  universities$: Observable<University[]> = this.universityService.getUniversities();

  ngOnInit() {
    this.title.setTitle('Tasahil | Premium Education Agency');
    this.meta.updateTag({ name: 'description', content: 'Explore the world with Tasahil. Premium education experiences tailored for you.' });
  }
}
