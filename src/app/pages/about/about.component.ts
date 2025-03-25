import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';

// Material modules
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MatCardModule,
    MatDividerModule,
    MatIconModule
  ],
  template: `
    <div class="about-container">
      <app-header (toggleCategoriesEvent)="handleToggleCategories()"></app-header>
      <div class="content-container">
        <mat-card class="about-card">
          <mat-card-header>
            <mat-card-title>Ozgur Alternatifi</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Bu uygulama, özel mulk yazılımlarin ve ozgur alternatiflerini önermek amacıyla tasarlanmıştır. Kullanıcıların özel mulk yazılımların kısıtlayıcı özelliklerine dikkat çekmek ve bu özellikleri kısıtlayan yazılımların ozgur yazılım alternatiflerini sunmak için kullanılır.</p>
            <ul>
              <li><a href="https://www.gnu.org/proprietary/proprietary.html">GNU'nun Özel Mulk Yazılımlar Listesi</a></li>
            </ul>
            <mat-divider></mat-divider>
            <h3><mat-icon>info</mat-icon> Nasıl Kullanılır</h3>
            <ul>
              <li>Kategoriler arasında geçiş yap veya belirli yazılımları ara</li>
              <li>Kartlar tıklayarak daha fazla ayrıntı ve ozgur yazılım alternatiflerini gör</li>
            </ul>
            <mat-divider></mat-divider>
            <h3>🄯 Lisans Bilgisi</h3>
            <div class="license-info">
              <p>Bu uygulama <strong>GNU Genel Kamu Lisansı (GPL) v3</strong> altında dağıtılmaktadır.</p>
              <p>GPL, kullanıcılara aşağıdaki özgürlükleri sağlar:</p>
              <ul>
                <li>Uygulamayı herhangi bir amaç için çalıştırma özgürlüğü</li>
                <li>Uygulamanın nasıl çalıştığını inceleme ve ihtiyaçlarınıza göre değiştirme özgürlüğü</li>
                <li>Değiştirilmiş sürümler de dahil olmak üzere uygulamayı yeniden dağıtma özgürlüğü</li>
                <li>Uygulamayı geliştirme ve geliştirmelerinizi kamuya açma özgürlüğü</li>
              </ul>
              <p>Kaynak Koduna Erişim: <a href="https://codeberg.org/cankurttekin/ozgur-yazilim-directory" target="_blank">Codeberg Repo</a></p>
            </div>
            <mat-divider></mat-divider>
            <h3><mat-icon>warning</mat-icon> Haklıktan Kaçınılması</h3>
            <ul>
              <li>Bu web sitesi sadece eğitim amacıyla hazırlanmıştır.</li>
              <li>Hiçbir şirketi boykot etmeyi teşvik etmiyoruz, ancak özellikle özel mulkyazılımların kısıtlamaları hakkında bilgi vermeyi amaçlıyoruz.</li>
              <li>Herhangi bir yazılımı kullanıp kullanmayacağınız tamamen size aittir.</li>
              <li>Hataları düzeltmek veya güncellemek için yukarıdaki Codeberg Reposunu veya GitHub yansisini kullanabilirsiniz.</li>
            </ul>
            <mat-divider></mat-divider>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .about-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background-color: var(--white);
    }
    
    .content-container {
      flex: 1;
      padding: 20px;
      background-color: var(--white);
      background-image: var(--diagonal-pattern);
      background-size: 20px 20px;
      margin-top: 70px;
    }
    
    .about-card {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      border: 3px solid #000;
      border-radius: 0 !important;
      box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.5) !important;
      background-color: var(--retro-orange) !important;
    }
    
    mat-card-title {
      font-size: 24px;
      margin-bottom: 16px;
      font-family: var(--heading-font);
      font-weight: 900;
      color: var(--retro-navy);
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    mat-divider {
      margin: 20px 0;
      border-top-color: #000 !important;
    }
    
    h3 {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 16px;
      font-family: var(--heading-font);
      font-weight: 900;
      color: var(--retro-navy);
    }
    
    ul {
      margin-left: 20px;
      font-family: var(--primary-font);
    }

    p {
      font-family: var(--primary-font);
      line-height: 1.5;
    }

    .license-info {
      background-color: rgba(255, 255, 255, 0.3);
      padding: 15px;
      border-left: 4px solid var(--retro-navy);
      margin-top: 10px;
    }

    .license-info a {
      color: var(--retro-navy);
      font-weight: bold;
      text-decoration: underline;
    }
  `]
})
export class AboutComponent {
  private router = inject(Router);
  
  constructor() { }
  
  handleToggleCategories(): void {
    // Navigate to home page to show categories
    this.router.navigate(['/']);
  }
} 