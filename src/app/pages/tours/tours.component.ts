import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { UniversityService, University } from '../../services/university.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TourCardComponent } from '../../components/tour-card/tour-card.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tours',
  standalone: true,
  imports: [CommonModule, TranslateModule, NavbarComponent, FooterComponent, TourCardComponent],
  template: `
    <app-navbar></app-navbar>

    <main class="tours-page">
      <section class="page-header">
        <div class="container text-center">
          <span class="section-tag">{{ 'TOURS' | translate }}</span>
          <h1>استكشف <span>أفضل الجامعات التركية</span></h1>
          <p>دليلك الشامل للدراسة في تركيا، اختر الجامعة التي تناسب طموحاتك.</p>
        </div>
      </section>

      <section class="tours-list section-padding">
        <div class="container">
          @if (universities$ | async; as universities) {
            <div class="grid">
              @for (uni of universities; track uni.id) {
                <app-tour-card [tour]="uni"></app-tour-card>
              }
            </div>
          } @else {
            <div class="flex-center" style="height: 300px;">
              <div class="loader"></div>
            </div>
          }
        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `,
  styles: [`
    .tours-page {
      padding-top: 80px;
    }
    .page-header {
      padding: 80px 0;
      background: var(--navy-dark);
      color: white;
      h1 { font-size: 3.5rem; margin-bottom: 20px; font-weight: 900; }
      h1 span { color: var(--orange); }
      p { opacity: 0.8; font-size: 1.2rem; max-width: 600px; margin: 0 auto; }
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 30px;
    }
    .loader {
      width: 48px;
      height: 48px;
      border: 5px solid var(--orange);
      border-bottom-color: transparent;
      border-radius: 50%;
      display: inline-block;
      box-sizing: border-box;
      animation: rotation 1s linear infinite;
    }
    @keyframes rotation {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class ToursComponent implements OnInit {
  private universityService = inject(UniversityService);
  private title = inject(Title);
  private meta = inject(Meta);

  universities$: Observable<University[]> = this.universityService.getUniversities();

  ngOnInit() {
    this.title.setTitle('الجامعات التركية | تساهيل للخدمات التعليمية');
    this.meta.updateTag({ name: 'description', content: 'قائمة بأفضل الجامعات التركية الخاصة والمعتمدة دولياً مع تفاصيل الرسوم والسكن.' });
  }
}
