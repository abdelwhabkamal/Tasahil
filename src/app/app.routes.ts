import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'tours', 
    loadComponent: () => import('./pages/tours/tours.component').then(m => m.ToursComponent) 
  },
  { 
    path: 'tours/:id', 
    loadComponent: () => import('./pages/tours/tour-detail.component').then(m => m.TourDetailComponent) 
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) 
  },
  {
    path: 'management-portal',
    loadComponent: () => import('./pages/admin/admin.component').then(m => m.AdminComponent)
  },
  { path: '**', redirectTo: '' }
];
