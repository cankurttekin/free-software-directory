export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface FlashcardItem {
  id: string;
  companyName: string;
  description: string;
  categoryId: string;
  logoUrl?: string;
  platform?: 'desktop' | 'mobile' | 'both';
  alternatives?: Alternative[];
}

export interface Alternative {
  name: string;
  description?: string;
  url?: string;
} 