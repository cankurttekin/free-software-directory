import { Component, EventEmitter, Input, Output, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

// Material modules
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';

import { Category, FlashcardItem } from '../../models/flashcard.model';
import { FlashcardService } from '../../services/flashcard.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {
  @Input() categories: Category[] = [];
  @Input() selectedCategoryId: string | null = null;
  @Input() flashcardItems: FlashcardItem[] = [];
  @Output() categorySelected = new EventEmitter<string | null>();
  
  isMobile: boolean = false;
  private flashcardService = inject(FlashcardService);
  
  constructor() { 
    // Only fetch all items if none are provided
    if (this.flashcardItems.length === 0) {
      this.flashcardItems = this.flashcardService.getFlashcardItems();
    }
    this.checkScreenSize();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }
  
  private checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }
  
  selectCategory(categoryId: string): void {
    // If clicking the already selected category, clear the filter
    if (this.selectedCategoryId === categoryId) {
      this.clearFilter();
      return;
    }
    
    this.selectedCategoryId = categoryId;
    this.categorySelected.emit(categoryId);
    
    // Close mobile sidebar after selection on mobile
    if (this.isMobile) {
      this.closeMobileSidebar();
    }
  }
  
  clearFilter(): void {
    this.selectedCategoryId = null;
    this.categorySelected.emit(null);
    
    // Close mobile sidebar after clearing filter on mobile
    if (this.isMobile) {
      this.closeMobileSidebar();
    }
  }
  
  private closeMobileSidebar(): void {
    // Find parent component to control sidebar visibility
    // This is done via DOM manipulation but ideally should use a service
    const sidebarEl = document.querySelector('.sidebar');
    if (sidebarEl) {
      sidebarEl.classList.remove('mobile-visible');
    }
  }
  
  getItemCountForCategory(categoryId: string): number {
    return this.flashcardItems.filter(item => item.categoryId === categoryId).length;
  }
} 