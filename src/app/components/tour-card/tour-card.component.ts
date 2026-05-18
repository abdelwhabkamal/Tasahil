import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { University } from '../../services/university.service';

@Component({
  selector: 'app-tour-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="tour-card glass hover-lift">
      <div class="image-wrapper">
        <div class="logo-placeholder flex-center">
          <i class="fas fa-university fa-3x"></i>
        </div>
        <span class="price">\${{ university.price }}</span>
      </div>
      <div class="content">
        <div class="meta">
          <span class="location"><i class="fas fa-map-marker-alt"></i> {{ university.location }}</span>
          <span class="rating"><i class="fas fa-star"></i> {{ university.rating }}</span>
        </div>
        <h3>{{ university.name }}</h3>
        <p>{{ university.description }}</p>
        <button class="btn btn-outline" [routerLink]="['/tours', university.id]">View Details</button>
      </div>
    </div>
  `,
  styles: [`
    .tour-card {
      overflow: hidden;
      display: flex;
      flex-direction: column;
      background: white !important;
      border: 1px solid rgba(0,0,0,0.05);
    }
    .image-wrapper {
      position: relative;
      height: 180px;
      background: var(--off-white);
      .logo-placeholder {
        height: 100%;
        color: var(--navy);
        opacity: 0.2;
      }
      .price {
        position: absolute;
        bottom: 15px;
        right: 15px;
        background: var(--orange);
        color: white;
        padding: 5px 15px;
        border-radius: 20px;
        font-weight: 700;
        box-shadow: 0 4px 10px rgba(255, 118, 38, 0.3);
      }
    }
    .content {
      padding: 25px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      font-weight: 700;
      i { color: var(--orange); margin-right: 5px; }
    }
    h3 { font-size: 1.3rem; margin: 0; color: var(--navy); font-weight: 800; }
    p { font-size: 0.95rem; opacity: 0.7; line-height: 1.5; flex-grow: 1; }
    button { width: 100%; margin-top: 10px; border-radius: 10px; }
  `]
})
export class TourCardComponent {
  @Input({ required: true, alias: 'tour' }) university!: University;
}
