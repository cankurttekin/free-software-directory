import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { HeaderComponent } from '../../components/header/header.component';
import { CategoryListComponent } from '../../components/category-list/category-list.component';
import { FlashcardListComponent } from '../../components/flashcard-list/flashcard-list.component';
import { HeaderService } from '../../services/header.service';
import { FlashcardService } from '../../services/flashcard.service';
import { Category, FlashcardItem } from '../../models/flashcard.model';

@Component({
  selector: 'app-mobile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    CategoryListComponent,
    FlashcardListComponent,
    MatIconModule
  ],
  templateUrl: './mobile.component.html',
  styleUrls: ['../home/home.component.scss']
})
export class MobileComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  flashcardItems: FlashcardItem[] = [];
  filteredItems: FlashcardItem[] = [];
  selectedCategoryId: string | null = null;
  searchQuery: string = '';
  private searchSubscription: Subscription | null = null;
  
  // Mobile responsive properties
  isMobile: boolean = false;
  showMobileSidebar: boolean = false;

  private flashcardService = inject(FlashcardService);
  private route = inject(ActivatedRoute);
  private headerService = inject(HeaderService);

  ngOnInit(): void {
    this.loadCategories();
    
    // Get category ID from route parameter if available
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('categoryId');
      if (categoryId) {
        this.selectedCategoryId = categoryId;
        this.handleCategorySelected(categoryId);
      }
    });

    // Subscribe to the header search service
    this.searchSubscription = this.headerService.searchQuery$.subscribe((query: string) => {
      this.searchQuery = query;
      this.handleSearch(query);
    });

    // Check screen size
    this.checkScreenSize();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
    
    // Remove event listener
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  onResize(): void {
    this.checkScreenSize();
  }

  private checkScreenSize(): void {
    const width = window.innerWidth;
    this.isMobile = width <= 768;
    
    // Only set sidebar visibility based on screen size, don't add classes to document.body
    if (this.isMobile) {
      this.showMobileSidebar = false;
    } else {
      this.showMobileSidebar = true;
    }
  }

  toggleMobileSidebar(): void {
    this.showMobileSidebar = !this.showMobileSidebar;
  }

  loadCategories(): void {
    const allCategories = this.flashcardService.getCategories();
    
    // First, get all mobile items (including 'both' platform)
    this.flashcardService.getFlashcardItemsByPlatform('mobile').subscribe(items => {
      this.flashcardItems = items;
      this.filteredItems = [...this.flashcardItems];
      
      // Get unique category IDs from the items
      const categoryIds = new Set(items.map(item => item.categoryId));
      
      // Filter categories to only include those with mobile items
      this.categories = allCategories.filter(category => categoryIds.has(category.id));
    });
  }

  handleCategorySelected(categoryId: string | null): void {
    this.selectedCategoryId = categoryId;
    
    // Reset search when changing category
    if (this.searchQuery) {
      this.searchQuery = '';
      this.headerService.updateSearchQuery(''); // Update the header search box
    }
    
    if (categoryId) {
      this.flashcardService.getFlashcardItemsByCategoryAndPlatform(categoryId, 'mobile').subscribe(items => {
        this.filteredItems = items;
      });
    } else {
      // Show all mobile items when no category is selected
      this.filteredItems = [...this.flashcardItems];
    }
    
    // Close mobile sidebar after category selection if on mobile
    if (this.isMobile) {
      this.showMobileSidebar = false;
    }
  }

  handleSearch(query: string): void {
    if (query) {
      // Reset category selection when searching
      this.selectedCategoryId = null;
      
      const searchResults = this.flashcardItems.filter(item => 
        item.companyName.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
      );
      this.filteredItems = searchResults;
    } else if (this.selectedCategoryId) {
      // If search is cleared but a category is selected, show that category
      this.flashcardService.getFlashcardItemsByCategoryAndPlatform(this.selectedCategoryId, 'mobile').subscribe(items => {
        this.filteredItems = items;
      });
    } else {
      // If search is cleared and no category is selected, show all mobile items
      this.filteredItems = [...this.flashcardItems];
    }
  }
}
