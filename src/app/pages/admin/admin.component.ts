import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UniversityService, University } from '../../services/university.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    
    <main class="admin-page section-padding">
      <div class="container">
        <!-- Password Protection -->
        <div *ngIf="!isAuthenticated" class="login-box glass">
          <h2>لوحة التحكم</h2>
          <p>يرجى إدخال كلمة المرور للمتابعة</p>
          <input type="password" [(ngModel)]="password" (keyup.enter)="login()" placeholder="كلمة المرور">
          <button class="btn btn-primary" (click)="login()">دخول</button>
        </div>

        <div *ngIf="isAuthenticated">
          <div class="admin-header">
            <h1>إدارة الجامعات</h1>
            <div class="actions">
              <button class="btn btn-outline" (click)="showSettings = !showSettings">
                <i class="fas fa-cog"></i> إعدادات GitHub
              </button>
              <button class="btn btn-primary" (click)="openModal()">إضافة جامعة جديدة</button>
              <button class="btn btn-navy" (click)="syncWithGithub()" [disabled]="isSyncing">
                {{ isSyncing ? 'جاري الحفظ...' : 'حفظ التغييرات نهائياً (GitHub)' }}
              </button>
            </div>
          </div>

          <!-- GitHub Settings Panel -->
          <div class="settings-panel glass" *ngIf="showSettings">
            <h3>إعدادات النشر (GitHub API)</h3>
            <p class="hint">هذه البيانات تُحفظ في متصفحك فقط ولا تظهر للمستخدمين</p>
            <div class="form-grid">
              <div class="form-group">
                <label>GitHub Token (PAT)</label>
                <input type="password" [(ngModel)]="ghConfig.token" placeholder="ghp_xxxxxx">
              </div>
              <div class="form-group">
                <label>اسم المستخدم (GitHub)</label>
                <input type="text" [(ngModel)]="ghConfig.owner" placeholder="Username">
              </div>
              <div class="form-group">
                <label>اسم المستودع (Repo)</label>
                <input type="text" [(ngModel)]="ghConfig.repo" placeholder="tasahil-site">
              </div>
              <div class="form-group">
                <label>الفرع (Branch)</label>
                <input type="text" [(ngModel)]="ghConfig.branch" placeholder="main">
              </div>
            </div>
            <button class="btn btn-navy btn-sm" (click)="saveSettings()">حفظ الإعدادات محلياً</button>
          </div>

          <div class="uni-table-wrapper glass">
            <table class="uni-table">
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>الموقع</th>
                  <th>السعر</th>
                  <th>إجراءات</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let uni of universities">
                  <td>{{ uni.name }}</td>
                  <td>{{ uni.location }}</td>
                  <td>{{ uni.price }}$</td>
                  <td>
                    <button class="btn-icon edit" (click)="editUniversity(uni)"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon delete" (click)="deleteUniversity(uni.id)"><i class="fas fa-trash"></i></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal Add/Edit -->
      <div class="modal" *ngIf="showModal">
        <div class="modal-content glass">
          <h3>{{ editingId ? 'تعديل جامعة' : 'إضافة جامعة جديدة' }}</h3>
          <form (submit)="saveUniversity()">
            <div class="form-group">
              <label>اسم الجامعة</label>
              <input type="text" [(ngModel)]="currentUni.name" name="name" required>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>الموقع</label>
                <input type="text" [(ngModel)]="currentUni.location" name="location" required>
              </div>
              <div class="form-group">
                <label>السعر السنوي ($)</label>
                <input type="number" [(ngModel)]="currentUni.price" name="price" required>
              </div>
            </div>
            <div class="form-group">
              <label>الوصف</label>
              <textarea [(ngModel)]="currentUni.description" name="description" rows="3"></textarea>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn btn-outline" (click)="closeModal()">إلغاء</button>
              <button type="submit" class="btn btn-primary">تحديث القائمة</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  `,
  styles: [`
    .admin-page { padding-top: 120px; min-height: 100vh; background: var(--off-white); direction: rtl; }
    .login-box { max-width: 400px; margin: 0 auto; padding: 40px; text-align: center; }
    .login-box input { width: 100%; padding: 12px; margin: 20px 0; border-radius: 8px; border: 1px solid #ddd; text-align: center; }
    
    .admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; }
    .admin-header h1 { color: var(--navy); margin: 0; font-weight: 900; }
    .actions { display: flex; gap: 15px; }

    .settings-panel { padding: 30px; margin-bottom: 30px; border: 1px solid var(--orange); }
    .settings-panel h3 { margin-bottom: 5px; color: var(--navy); }
    .hint { font-size: 0.85rem; opacity: 0.7; margin-bottom: 20px; color: var(--orange); font-weight: 700; }
    .form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px; }

    .uni-table-wrapper { overflow-x: auto; background: white !important; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
    .uni-table { width: 100%; border-collapse: collapse; }
    .uni-table th, .uni-table td { padding: 20px; text-align: right; border-bottom: 1px solid #eee; font-weight: 700; }
    .uni-table th { background: var(--navy); color: white; }
    
    .btn-icon { background: none; border: none; cursor: pointer; font-size: 1.1rem; padding: 5px 10px; transition: 0.2s; }
    .btn-icon.edit { color: var(--navy); }
    .btn-icon.delete { color: #ff4d4d; }

    .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 20px; }
    .modal-content { width: 100%; max-width: 600px; padding: 40px; background: white !important; border-radius: 25px; }
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; margin-bottom: 8px; font-weight: 800; color: var(--navy); }
    .form-group input, .form-group textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 10px; font-family: inherit; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .modal-actions { display: flex; justify-content: flex-end; gap: 15px; margin-top: 30px; }
    
    .btn-sm { padding: 8px 20px; font-size: 0.85rem; }
  `]
})
export class AdminComponent implements OnInit {
  private universityService = inject(UniversityService);
  private http = inject(HttpClient);
  
  universities: University[] = [];
  isAuthenticated = false;
  password = '';
  showModal = false;
  showSettings = false;
  isSyncing = false;
  editingId: number | null = null;
  
  ghConfig = {
    token: '',
    owner: '',
    repo: '',
    path: 'public/assets/data/universities.json',
    branch: 'main'
  };

  currentUni: Partial<University> = {
    name: '',
    location: 'إسطنبول',
    type: 'خاصة',
    price: 0,
    logo: 'assets/images/university_placeholder.png',
    description: '',
    rating: 4.8
  };

  ngOnInit() {
    this.universityService.getUniversities().subscribe(data => {
      this.universities = data;
    });
    // Load GitHub settings from localStorage
    const savedConfig = localStorage.getItem('gh_config');
    if (savedConfig) {
      this.ghConfig = { ...this.ghConfig, ...JSON.parse(savedConfig) };
    }
  }

  login() {
    if (this.password === 'tasahil2026') {
      this.isAuthenticated = true;
    } else {
      alert('كلمة المرور خاطئة');
    }
  }

  saveSettings() {
    localStorage.setItem('gh_config', JSON.stringify(this.ghConfig));
    alert('تم حفظ إعدادات GitHub في متصفحك بنجاح');
    this.showSettings = false;
  }

  openModal() {
    this.editingId = null;
    this.currentUni = { location: 'إسطنبول', type: 'خاصة', price: 0, rating: 4.8 };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  editUniversity(uni: University) {
    this.editingId = uni.id;
    this.currentUni = { ...uni };
    this.showModal = true;
  }

  saveUniversity() {
    if (this.editingId) {
      const index = this.universities.findIndex(u => u.id === this.editingId);
      this.universities[index] = { ...this.currentUni as University, id: this.editingId };
    } else {
      const newId = this.universities.length > 0 ? Math.max(...this.universities.map(u => u.id)) + 1 : 1;
      this.universities.push({ ...this.currentUni as University, id: newId });
    }
    this.closeModal();
  }

  deleteUniversity(id: number) {
    if (confirm('هل أنت متأكد من مسح هذه الجامعة؟')) {
      this.universities = this.universities.filter(u => u.id !== id);
    }
  }

  async syncWithGithub() {
    if (!this.ghConfig.token || !this.ghConfig.owner || !this.ghConfig.repo) {
      alert('يرجى ملء إعدادات GitHub أولاً');
      this.showSettings = true;
      return;
    }

    this.isSyncing = true;
    const url = `https://api.github.com/repos/${this.ghConfig.owner}/${this.ghConfig.repo}/contents/${this.ghConfig.path}`;
    const headers = new HttpHeaders({
      'Authorization': `token ${this.ghConfig.token}`,
      'Accept': 'application/vnd.github.v3+json'
    });

    try {
      // 1. Get current file SHA
      const fileInfo: any = await this.http.get(url, { headers }).toPromise();
      const sha = fileInfo.sha;

      // 2. Prepare content
      const content = btoa(unescape(encodeURIComponent(JSON.stringify(this.universities, null, 2))));

      // 3. Update file
      await this.http.put(url, {
        message: 'Update universities data via Admin Portal',
        content: content,
        sha: sha,
        branch: this.ghConfig.branch
      }, { headers }).toPromise();

      alert('تم التحديث بنجاح! سيقوم Netlify بإعادة بناء الموقع خلال دقائق.');
    } catch (error: any) {
      console.error(error);
      alert('فشل التحديث: ' + (error.error?.message || 'خطأ غير معروف'));
    } finally {
      this.isSyncing = false;
    }
  }
}
