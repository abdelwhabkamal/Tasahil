import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, NavbarComponent, FooterComponent, FormsModule],
  template: `
    <app-navbar></app-navbar>

    <main class="contact-page">
      <section class="page-header">
        <div class="container text-center">
          <h1>{{ 'CONTACT' | translate }}</h1>
          <p>Have questions? We're here to help you plan your next journey.</p>
        </div>
      </section>

      <section class="contact-form-section section-padding">
        <div class="container">
          <div class="grid">
            <div class="info glass">
              <h2>Get in Touch</h2>
              <p>Fill out the form and our team will get back to you within 24 hours.</p>

              <div class="contact-methods">
                <div class="method">
                  <i class="fas fa-envelope"></i>
                  <span>support\@tasahil.com</span>
                </div>
                <div class="method">
                  <i class="fas fa-phone"></i>
                  <span>+90 555 000 0000</span>
                </div>
                <div class="method">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>Istanbul, Turkey</span>
                </div>
              </div>
            </div>

            <form class="contact-form glass" (submit)="onSubmit($event)">
              <div class="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your Name" required>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" placeholder="Your Email" required>
              </div>
              <div class="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="Your Message" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </main>

    <app-footer></app-footer>
  `,
  styles: [`
    .contact-page {
      padding-top: 80px;
    }
    .page-header {
      padding: 60px 0;
      background: var(--bg-dark);
      color: white;
      h1 { font-size: 3rem; margin-bottom: 10px; }
      p { opacity: 0.7; font-size: 1.1rem; }
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1.5fr;
      gap: 40px;
      align-items: start;
    }
    .info, .contact-form {
      padding: 40px;
    }
    .info {
      h2 { margin-bottom: 20px; }
      p { opacity: 0.7; margin-bottom: 30px; }
    }
    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: 20px;
      .method {
        display: flex;
        align-items: center;
        gap: 15px;
        i { color: var(--primary); font-size: 1.2rem; }
      }
    }
    .form-group {
      margin-bottom: 20px;
      label { display: block; margin-bottom: 8px; font-weight: 600; }
      input, textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid rgba(0,0,0,0.1);
        border-radius: 8px;
        background: rgba(255,255,255,0.5);
        font-family: inherit;
        &:focus { outline: none; border-color: var(--primary); }
      }
    }
    button { width: 100%; }

    @media (max-width: 768px) {
      .grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ContactComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit() {
    this.title.setTitle('Contact Us | Tasahil');
    this.meta.updateTag({ name: 'description', content: 'Get in touch with Tasahil Travel Agency. We are here to help you plan your next journey.' });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    alert('Thank you for your message! We will contact you soon.');
  }
}
