import { Component, OnInit, OnDestroy, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FlashcardService } from '../../services/flashcard.service';
import { Category, FlashcardItem } from '../../models/flashcard.model';
import { HeaderComponent } from '../../components/header/header.component';
import { CategoryListComponent } from '../../components/category-list/category-list.component';
import { FlashcardListComponent } from '../../components/flashcard-list/flashcard-list.component';
import { HeaderService } from '../../services/header.service';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    CategoryListComponent,
    FlashcardListComponent,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
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

  constructor() {
    // Initialize mobile detection
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  // Check if screen is mobile size
  private checkScreenSize() {
    const width = window.innerWidth;
    this.isMobile = width <= 768;
    
    // Only set sidebar visibility based on screen size, don't add classes to document.body
    if (this.isMobile) {
      this.showMobileSidebar = false;
    } else {
      this.showMobileSidebar = true;
    }
  }

  // Toggle sidebar visibility on mobile
  toggleMobileSidebar() {
    this.showMobileSidebar = !this.showMobileSidebar;
  }

  ngOnInit(): void {
    this.loadCategories();
    this.flashcardItems = this.flashcardService.getFlashcardItems();
    this.filteredItems = [...this.flashcardItems];
    
    // Get category ID from route parameter if available
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('categoryId');
      if (categoryId) {
        this.selectedCategoryId = categoryId;
      }
    });

    // Subscribe to the header search service
    this.searchSubscription = this.headerService.searchQuery$.subscribe((query: string) => {
      this.searchQuery = query;
      this.handleSearch(query);
    });
  }

  ngOnDestroy(): void {
    // Clean up subscriptions
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadCategories(): void {
    this.categories = this.flashcardService.getCategories();
  }

  handleCategorySelected(categoryId: string | null): void {
    this.selectedCategoryId = categoryId;
    
    // Reset search when changing category
    if (this.searchQuery) {
      this.searchQuery = '';
      this.headerService.updateSearchQuery(''); // Update the header search box
    }
    
    if (categoryId) {
      this.flashcardService.getFlashcardItemsByCategory(categoryId).subscribe(items => {
        this.filteredItems = items;
      });
    } else {
      // Show all items when no category is selected
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
      
      this.flashcardService.searchFlashcardItems(query).subscribe(items => {
        this.filteredItems = items;
      });
    } else if (this.selectedCategoryId) {
      // If search is cleared but a category is selected, show that category
      this.flashcardService.getFlashcardItemsByCategory(this.selectedCategoryId).subscribe(items => {
        this.filteredItems = items;
      });
    } else {
      // If search is cleared and no category is selected, show all items
      this.filteredItems = [...this.flashcardItems];
    }
  }
} 