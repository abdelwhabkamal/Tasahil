import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UniversityService, University } from '../../services/university.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [CommonModule, TranslateModule, NavbarComponent, FooterComponent, RouterModule],
  template: `
    <app-navbar></app-navbar>

    <main class="uni-detail-page" *ngIf="university$ | async as uni">
      <!-- Hero Section -->
      <section class="hero flex-center">
        <div class="hero-overlay"></div>
        <div class="container hero-container text-center fade-in-up">
          <span class="badge">{{ uni.type }}</span>
          <h1 class="hero-title">ابدأ مسيرتك الأكاديمية <br> في <span>{{ uni.name }}</span></h1>
          <p class="hero-subtitle">احصل على قبولك الجامعي في واحدة من أرقى الجامعات التركية بخصومات حصرية</p>

          <div class="hero-stats glass">
            <div class="stat">
              <span class="val">16,200+</span>
              <span class="lab">طالب مسجل</span>
            </div>
            <div class="stat">
              <span class="val">100+</span>
              <span class="lab">مختبر ومعمل</span>
            </div>
            <div class="stat">
              <span class="val">15+</span>
              <span class="lab">كلية وتخصص</span>
            </div>
            <div class="stat">
              <span class="val">36,200+</span>
              <span class="lab">خريج ناجح</span>
            </div>
          </div>
        </div>
      </section>

      <!-- About University Section -->
      <section class="section-padding bg-white">
        <div class="container">
          <div class="grid-2">
            <div class="content">
              <span class="section-tag">عن الجامعة</span>
              <h2 class="section-title">لماذا تختار <span>{{ uni.name }}</span>؟</h2>
              <p class="description">{{ uni.description }}</p>

              <ul class="feature-list">
                <li><i class="fas fa-check-circle"></i> برامج تعليمية معتمدة دولياً (MÜDEK, JCI)</li>
                <li><i class="fas fa-check-circle"></i> مرافق جامعية حديثة ومجهزة بأعلى التقنيات</li>
                <li><i class="fas fa-check-circle"></i> بيئة تعليمية متعددة الثقافات مع طلاب من 120 دولة</li>
                <li><i class="fas fa-check-circle"></i> شراكات استراتيجية مع كبرى الشركات العالمية للتدريب</li>
              </ul>

              <button class="btn btn-primary">تحميل البروشور التعريفي</button>
            </div>
            <div class="image-box">
              <div class="main-img-wrapper">
                <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80" alt="University Campus">
                <div class="img-label">الحرم الجامعي</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Video Section -->
      <section class="section-padding bg-off-white">
        <div class="container text-center">
          <span class="section-tag">جولة افتراضية</span>
          <h2 class="section-title">شاهد جولة داخل <span>{{ uni.name }}</span></h2>
          <div class="video-wrapper glass">
            <div class="play-btn"><i class="fas fa-play"></i></div>
            <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80" alt="Video Placeholder">
          </div>
        </div>
      </section>

      <!-- Why Choose University Cards -->
      <section class="section-padding bg-white">
        <div class="container">
          <div class="text-center">
            <span class="section-tag">مميزات</span>
            <h2 class="section-title">لماذا تختار <span>{{ uni.name }}</span>؟</h2>
          </div>
          <div class="features-grid-6">
            <div class="feat-card glass-white">
              <div class="feat-icon">01</div>
              <h4>اعتراف دولي</h4>
              <p>الجامعة معترف بها في كافة الدول العربية والاتحاد الأوروبي</p>
            </div>
            <div class="feat-card glass-white">
              <div class="feat-icon">02</div>
              <h4>تبادل طلابي</h4>
              <p>عضو في برنامج Erasmus للتبادل الطلابي مع جامعات أوروبا</p>
            </div>
            <div class="feat-card glass-white">
              <div class="feat-icon">03</div>
              <h4>تجهيزات حديثة</h4>
              <p>تضم أكثر من 100 مختبر ومعمل مجهز بأحدث التقنيات</p>
            </div>
            <div class="feat-card glass-white">
              <div class="feat-icon">04</div>
              <h4>موقع استراتيجي</h4>
              <p>تقع في قلب مدينة إسطنبول مع سهولة الوصول للمواصلات</p>
            </div>
            <div class="feat-card glass-white">
              <div class="feat-icon">05</div>
              <h4>فرص عمل</h4>
              <p>مركز وظيفي يساعد الطلاب في إيجاد فرص تدريب وعمل</p>
            </div>
            <div class="feat-card glass-white">
              <div class="feat-icon">06</div>
              <h4>أنشطة طلابية</h4>
              <p>أكثر من 80 نادياً طلابياً لمختلف الهوايات والأنشطة</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Academic Programs Section -->
      <section class="section-padding bg-navy text-white">
        <div class="container">
          <div class="text-center">
            <span class="section-tag">التخصصات</span>
            <h2 class="section-title text-white">البرامج <span>الأكاديمية</span></h2>
            <p class="section-subtitle">تقدم الجامعة مجموعة واسعة من التخصصات في مختلف المجالات</p>
          </div>

          <div class="programs-grid">
            <div class="program-card glass">
              <i class="fas fa-stethoscope"></i>
              <h4>الطب البشري</h4>
              <p>6 سنوات - لغة إنجليزية/تركية</p>
            </div>
            <div class="program-card glass">
              <i class="fas fa-tooth"></i>
              <h4>طب الأسنان</h4>
              <p>5 سنوات - لغة إنجليزية/تركية</p>
            </div>
            <div class="program-card glass">
              <i class="fas fa-laptop-code"></i>
              <h4>هندسة الحاسوب</h4>
              <p>4 سنوات - لغة إنجليزية</p>
            </div>
            <div class="program-card glass">
              <i class="fas fa-building"></i>
              <h4>العمارة</h4>
              <p>4 سنوات - لغة إنجليزية/تركية</p>
            </div>
            <div class="program-card glass">
              <i class="fas fa-chart-line"></i>
              <h4>إدارة الأعمال</h4>
              <p>4 سنوات - لغة إنجليزية</p>
            </div>
            <div class="program-card glass">
              <i class="fas fa-pills"></i>
              <h4>الصيدلة</h4>
              <p>5 سنوات - لغة تركية</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Registration Timeline Section -->
      <section class="section-padding bg-white">
        <div class="container">
          <div class="text-center">
            <span class="section-tag">خارطة الطريق</span>
            <h2 class="section-title">رحلة التسجيل في <span>{{ uni.name }}</span></h2>
          </div>

          <div class="timeline">
            <div class="timeline-item">
              <div class="time-num">01</div>
              <div class="time-content">
                <h4>طلب الاستشارة</h4>
                <p>تواصل معنا للحصول على كافة المعلومات عن التخصصات والأسعار</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="time-num">02</div>
              <div class="time-content">
                <h4>تجهيز الملف</h4>
                <p>نساعدك في جمع وترجمة وتصديق كافة الأوراق المطلوبة للتقديم</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="time-num">03</div>
              <div class="time-content">
                <h4>الحصول على القبول</h4>
                <p>نضمن لك الحصول على القبول المبدئي خلال 48 ساعة فقط</p>
              </div>
            </div>
            <div class="timeline-item">
              <div class="time-num">04</div>
              <div class="time-content">
                <h4>التسجيل النهائي</h4>
                <p>نرافقك إلى مقر الجامعة لإتمام إجراءات التسجيل واستلام البطاقة الجامعية</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Photo Gallery Section -->
      <section class="section-padding bg-off-white">
        <div class="container">
          <div class="text-center">
            <span class="section-tag">معرض الصور</span>
            <h2 class="section-title">جولة مصورة في <span>الحرم الجامعي</span></h2>
          </div>

          <div class="gallery-grid">
            <div class="gallery-item"><img src="https://images.unsplash.com/photo-1541339907198-e08756eaa589?auto=format&fit=crop&w=400&q=80"></div>
            <div class="gallery-item"><img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80"></div>
            <div class="gallery-item"><img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80"></div>
            <div class="gallery-item"><img src="https://images.unsplash.com/photo-1524178232363-1fb28f74b671?auto=format&fit=crop&w=400&q=80"></div>
            <div class="gallery-item"><img src="https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?auto=format&fit=crop&w=400&q=80"></div>
            <div class="gallery-item"><img src="https://images.unsplash.com/photo-1525921429624-479b6a29d84c?auto=format&fit=crop&w=400&q=80"></div>
          </div>
        </div>
      </section>

      <!-- Testimonials Section -->
      <section class="section-padding bg-white">
        <div class="container">
          <div class="text-center">
            <span class="section-tag">آراء الطلاب</span>
            <h2 class="section-title">ماذا يقول <span>طلابنا</span>؟</h2>
          </div>
          <div class="testimonials-grid">
            <div class="testimonial-card glass-white">
              <div class="user-info">
                <div class="avatar">A</div>
                <div>
                  <h5>أحمد منصور</h5>
                  <span>طالب طب بشري</span>
                </div>
              </div>
              <p>"تجربة الدراسة في تركيا من خلال تساهيل كانت رائعة. ساعدوني في كافة التفاصيل من القبول وحتى السكن."</p>
              <div class="stars"><i class="fas fa-star" *ngFor="let s of [1,2,3,4,5]"></i></div>
            </div>
            <div class="testimonial-card glass-white">
              <div class="user-info">
                <div class="avatar">M</div>
                <div>
                  <h5>مريم خالد</h5>
                  <span>طالبة هندسة عمارة</span>
                </div>
              </div>
              <p>"الجامعة رائعة والمرافق متطورة جداً. أنصح الجميع بالتقديم من خلال وكيل معتمد لتوفير الوقت والجهد."</p>
              <div class="stars"><i class="fas fa-star" *ngFor="let s of [1,2,3,4,5]"></i></div>
            </div>
            <div class="testimonial-card glass-white">
              <div class="user-info">
                <div class="avatar">Y</div>
                <div>
                  <h5>ياسر علي</h5>
                  <span>طالب إدارة أعمال</span>
                </div>
              </div>
              <p>"حصلت على خصم كبير على الرسوم الدراسية بفضل تساهيل. الاستشارة كانت احترافية جداً."</p>
              <div class="stars"><i class="fas fa-star" *ngFor="let s of [1,2,3,4,5]"></i></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Final Registration Form -->
      <section class="section-padding bg-navy text-white">
        <div class="container">
          <div class="registration-box glass">
            <div class="text-center">
              <span class="section-tag">سجل الآن</span>
              <h2 class="text-white">احجز مقعدك في <span>{{ uni.name }}</span> اليوم</h2>
              <p>املأ البيانات التالية وسيتواصل معك مستشارك التعليمي فوراً</p>
            </div>

            <form class="reg-form" (submit)="onBook($event)">
              <div class="form-grid">
                <div class="form-group">
                  <label>الاسم الكامل</label>
                  <input type="text" placeholder="أدخل اسمك الكامل" required>
                </div>
                <div class="form-group">
                  <label>رقم الهاتف</label>
                  <input type="tel" placeholder="+90" required>
                </div>
                <div class="form-group">
                  <label>التخصص المطلوب</label>
                  <input type="text" placeholder="مثال: هندسة الحاسوب" required>
                </div>
                <div class="form-group">
                  <label>لغة الدراسة</label>
                  <select required>
                    <option value="en">الإنجليزية</option>
                    <option value="tr">التركية</option>
                  </select>
                </div>
              </div>
              <button type="submit" class="btn btn-primary w-100">إرسال طلب التسجيل</button>
            </form>
          </div>
        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `,
  styles: [`
    .uni-detail-page { padding-top: 0; direction: rtl; }

    .hero {
      height: 85vh;
      position: relative;
      background: url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;
      color: white;
      .hero-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(rgba(28, 23, 74, 0.9), rgba(28, 23, 74, 0.7));
      }
      .hero-container { position: relative; z-index: 1; max-width: 900px; }
    }

    .hero-title {
      font-size: clamp(2.5rem, 7vw, 4.5rem);
      font-weight: 900;
      margin: 20px 0;
      line-height: 1.1;
      span { color: var(--orange); }
    }

    .hero-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: 30px;
      margin-top: 50px;
      border-radius: 25px !important;
      .stat {
        display: flex;
        flex-direction: column;
        gap: 5px;
        .val { font-size: 1.8rem; font-weight: 900; color: var(--orange); }
        .lab { font-size: 0.85rem; opacity: 0.8; font-weight: 700; }
        &:not(:last-child) { border-left: 1px solid rgba(255, 255, 255, 0.1); }
      }
    }

    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
    .feature-list {
      margin: 30px 0;
      li {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 15px;
        font-weight: 700;
        color: var(--navy);
        i { color: var(--orange); font-size: 1.2rem; }
      }
    }

    .main-img-wrapper {
      position: relative;
      border-radius: 30px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0,0,0,0.1);
      .img-label {
        position: absolute;
        top: 20px;
        right: 20px;
        background: var(--orange);
        color: white;
        padding: 6px 18px;
        border-radius: 30px;
        font-weight: 800;
        font-size: 0.8rem;
      }
    }

    .video-wrapper {
      position: relative;
      max-width: 1000px;
      margin: 0 auto;
      border-radius: 30px;
      overflow: hidden;
      aspect-ratio: 16/9;
      cursor: pointer;
      img { width: 100%; height: 100%; object-fit: cover; }
      .play-btn {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.2);
        i {
          width: 80px;
          height: 80px;
          background: var(--orange);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          padding-right: 5px;
          box-shadow: 0 0 30px rgba(255, 118, 38, 0.5);
          transition: 0.3s;
        }
      }
      &:hover .play-btn i { transform: scale(1.1); }
    }

    .bg-navy { background: var(--navy-dark); }
    .programs-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-top: 50px;
    }
    .program-card {
      padding: 40px;
      text-align: center;
      transition: 0.3s;
      &:hover { border-color: var(--orange); transform: translateY(-10px); }
      i { font-size: 3rem; color: var(--orange); margin-bottom: 20px; }
      h4 { font-size: 1.4rem; font-weight: 800; margin-bottom: 10px; }
      p { opacity: 0.7; font-size: 0.9rem; font-weight: 700; }
    }

    .features-grid-6 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-top: 50px;
    }
    .feat-card {
      padding: 35px;
      text-align: right;
      transition: 0.3s;
      border: 1px solid rgba(0,0,0,0.05);
      &:hover { border-color: var(--orange); transform: translateY(-5px); }
      .feat-icon {
        width: 50px;
        height: 50px;
        background: var(--orange-glow);
        color: var(--orange);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        margin-bottom: 20px;
      }
      h4 { font-size: 1.25rem; font-weight: 800; margin-bottom: 12px; color: var(--navy); }
      p { font-size: 0.95rem; color: var(--gray-text); line-height: 1.6; }
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 30px;
      margin-top: 50px;
    }
    .testimonial-card {
      padding: 35px;
      border: 1px solid rgba(0,0,0,0.05);
      .user-info {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 20px;
        .avatar {
          width: 50px;
          height: 50px;
          background: var(--navy);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
        }
        h5 { margin: 0; font-size: 1.1rem; font-weight: 800; color: var(--navy); }
        span { font-size: 0.85rem; color: var(--orange); font-weight: 700; }
      }
      p { font-style: italic; color: var(--gray-text); line-height: 1.7; margin-bottom: 20px; }
      .stars { color: #ffc107; font-size: 0.8rem; display: flex; gap: 4px; }
    }

    .timeline {
      max-width: 800px;
      margin: 60px auto 0;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 35px;
        width: 2px;
        background: rgba(28, 23, 74, 0.1);
      }
    }
    .timeline-item {
      display: flex;
      align-items: center;
      gap: 30px;
      margin-bottom: 40px;
      position: relative;
      .time-num {
        width: 70px;
        height: 70px;
        background: white;
        border: 2px solid var(--orange);
        color: var(--orange);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 900;
        font-size: 1.2rem;
        z-index: 1;
      }
      .time-content {
        background: var(--off-white);
        padding: 25px 35px;
        border-radius: 20px;
        flex: 1;
        h4 { font-weight: 800; margin-bottom: 8px; color: var(--navy); }
        p { margin: 0; opacity: 0.7; font-weight: 600; }
      }
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 50px;
    }
    .gallery-item {
      border-radius: 20px;
      overflow: hidden;
      height: 250px;
      img { width: 100%; height: 100%; object-fit: cover; transition: 0.5s; }
      &:hover img { transform: scale(1.1); }
    }

    .registration-box {
      max-width: 900px;
      margin: 0 auto;
      padding: 60px;
      border-radius: 30px !important;
    }
    .reg-form {
      margin-top: 40px;
      .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 30px;
      }
      .form-group label { display: block; margin-bottom: 10px; font-weight: 700; }
      input, select {
        width: 100%;
        padding: 14px 20px;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.1);
        background: rgba(255,255,255,0.05);
        color: white;
        font-family: inherit;
        &:focus { outline: none; border-color: var(--orange); }
      }
      select option { background: var(--navy-dark); }
    }

    .w-100 { width: 100%; }

    @media (max-width: 992px) {
      .grid-2, .programs-grid, .gallery-grid { grid-template-columns: 1fr; }
      .hero-stats { grid-template-columns: 1fr 1fr; gap: 20px; }
      .stat:nth-child(2n) { border-left: none !important; }
      .reg-form .form-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class TourDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private universityService = inject(UniversityService);
  university$!: Observable<University | undefined>;

  ngOnInit() {
    this.university$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.universityService.getUniversityById(id);
      })
    );
  }

  onBook(event: Event) {
    event.preventDefault();
    alert('شكراً لاهتمامك! سيقوم فريق تساهيل بالتواصل معك قريباً.');
  }
}
