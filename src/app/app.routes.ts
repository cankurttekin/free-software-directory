import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { DesktopComponent } from './pages/desktop/desktop.component';
import { MobileComponent } from './pages/mobile/mobile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'desktop', component: DesktopComponent },
  { path: 'mobile', component: MobileComponent },
  { path: '**', redirectTo: '' }
];
