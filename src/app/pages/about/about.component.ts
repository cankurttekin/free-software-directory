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
            <mat-card-title>Free Software Directory</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>This application is designed to raise awareness of proprietary software and its restrictive features. It aims to inform users about the limitations of proprietary software and provide free software alternatives.</p>
            <p>Most of the software and alternatives listed here are my personal preferences and experiences. So you should not expect any liability.</p>
            <p>If you pursue freedom, propably as you are here reading this, you should make your own research and decide if you want convinience or freedom more.</p>
            <ul>
              <li><a href="https://www.gnu.org/proprietary/proprietary.html">GNU's List of Proprietary Software</a></li>
            </ul>
            <mat-divider></mat-divider>
            <h3><mat-icon>info</mat-icon> How to Use</h3>
            <ul>
              <li>Navigate between categories or search for specific software</li>
              <li>Click on cards to view more details and free software alternatives</li>
            </ul>
            <mat-divider></mat-divider>
            <h3>🄯 License Information</h3>
            <div class="license-info">
              <p>This application is distributed under the <strong>GNU General Public License (GPL) v3</strong>.</p>
              <p>GPL provides the following freedoms:</p>
              <ul>
                <li>The right to run the application for any purpose</li>
                <li>The right to examine how the application works and modify it for your needs</li>
                <li>The right to distribute modified versions of the application</li>
                <li>The right to develop and share improvements with the public</li>
              </ul>
              <p>Access to Source Code: <a href="https://codeberg.org/cankurttekin/ozgur-yazilim-directory" target="_blank">Codeberg Repo</a></p>
            </div>
            <mat-divider></mat-divider>
            <h3><mat-icon>warning</mat-icon> Disclaimer</h3>
            <ul>
              <li>This website is only for educational purposes.</li>
              <li>We do not encourage boycotting any company, but we aim to provide information about the limitations of proprietary software.</li>
              <li>Whether you use the software or not is entirely up to you.</li>
              <li>You can use the above Codeberg or GitHub repository to fix bugs or update the application.</li>
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
    this.router.navigate(['/']);
  }
} 