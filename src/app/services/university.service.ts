import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface University {
  id: number;
  name: string;
  location: string;
  type: string;
  price: number;
  logo: string;
  description: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private http = inject(HttpClient);
  private dataUrl = 'assets/data/universities.json';

  getUniversities(): Observable<University[]> {
    return this.http.get<University[]>(this.dataUrl);
  }

  getUniversityById(id: number): Observable<University | undefined> {
    return new Observable(observer => {
      this.getUniversities().subscribe(universities => {
        const university = universities.find(u => u.id === id);
        observer.next(university);
        observer.complete();
      });
    });
  }
}
