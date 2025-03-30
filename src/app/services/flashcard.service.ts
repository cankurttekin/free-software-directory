import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FlashcardItem, Category } from '../models/flashcard.model';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private categories: Category[] = [
    { id: '1', name: 'Operating System', description: 'Operating System', icon: 'computer' },
    { id: '2', name: 'Office', description: 'Office', icon: 'description' },
    { id: '3', name: 'Graphic and Audio Editing', description: 'Graphic, video, audio editing tools', icon: 'brush' },
    { id: '4', name: 'Cloud', description: 'Private cloud storage and platforms', icon: 'cloud' },
    { id: '5', name: 'Browser', description: 'Web browsers', icon: 'public' },
    { id: '6', name: 'Software Development', description: 'IDE and development platforms', icon: 'code' },
    { id: '7', name: 'Social Media', description: 'Social media applications', icon: 'smartphone' },
    { id: '8', name: 'Media', description: 'Music and video playback tools', icon: 'music_note' },
    { id: '9', name: 'Maps', description: 'Map and location information', icon: 'map' },
    { id: '10', name: 'Communication', description: 'Chat and video conferencing tools', icon: 'message' }
  ];

  private flashcardItems: FlashcardItem[] = [
    /*
    // Operating Systems
    { 
      id: '1', 
      companyName: 'Microsoft Windows', 
      description: 'Proprietary operating system for personal computers. Windows is closed-source and contains telemetry functions that collect user data.', 
      categoryId: '1',
      //logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Windows_logo_-_2012.svg',
      platform: 'desktop',
    },
    { 
      id: '2', 
      companyName: 'macOS', 
      description: 'Apple\'s proprietary operating system for Mac computers. While built on open source Darwin kernel, many components are closed source.', 
      categoryId: '1',
      //logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/21/MacOS_wordmark_%282017%29.svg',
      platform: 'desktop',
    },
    */
    {
      id: '1',
      companyName: 'Google Search',
      description: 'Proprietary search engine owned by Google. Alternatives: DuckDuckGo, Ecosia, or Startpage.',
      categoryId: '5',
      platform: 'both',
      alternatives: [
        { name: '? DuckDuckGo', url: 'https://duckduckgo.com' },
      ]
    },

    // Productivity Software
    { 
      id: '3', 
      companyName: 'Microsoft Office', 
      description: 'Proprietary office suite including Word, Excel, PowerPoint. Requires licensing fees and locks documents in proprietary formats.', 
      categoryId: '2',
      //logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Microsoft_Office_Logo_%282019%29.png',
      platform: 'desktop',
      alternatives: [
        { name: 'LibreOffice', url: 'https://www.libreoffice.org' },
        { name: 'OpenOffice', url: 'https://www.openoffice.org' }
      ]
    },
    { 
      id: '4', 
      companyName: 'Adobe Acrobat', 
      description: 'Proprietary PDF editor with locked features behind subscription fees.', 
      categoryId: '2',
      //logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Adobe_Acrobat_DC_logo_2020.svg/640px-Adobe_Acrobat_DC_logo_2020.svg.png',
      platform: 'desktop',
      alternatives: [
        { name: 'Okular', url: 'https://okular.kde.org' }
      ]
    },
    
    // Creative Software
    { 
      id: '5', 
      companyName: 'Adobe Photoshop', 
      description: 'Proprietary image editing software locked behind subscription fees.', 
      categoryId: '3',
      //logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Adobe_Photoshop_CC_icon.svg/640px-Adobe_Photoshop_CC_icon.svg.png',
      platform: 'desktop',
      alternatives: [
        { name: 'GIMP', url: 'https://www.gimp.org' }
      ]
    },

    // Cloud Services
    { 
      id: '8', 
      companyName: 'Google Drive', 
      description: 'Proprietary cloud storage that scans user files for targeted advertising. Alternatives: Nextcloud, ownCloud, or Seafile.', 
      categoryId: '4',
      platform: 'both'
    },
    { 
      id: '9', 
      companyName: 'Dropbox', 
      description: 'Closed-source cloud storage with limited free tier and privacy concerns. Alternatives: Nextcloud, Syncthing, or Seafile.', 
      categoryId: '4',
      //logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Dropbox_logo_%282013-2020%29.svg',
      platform: 'both'
    },
    
    // Browsers
    { 
      id: '10', 
      companyName: 'Google Chrome', 
      description: 'Proprietary browser with heavy tracking and privacy concerns. While Chromium is open source, Chrome adds closed-source tracking components.', 
      categoryId: '5',
      //logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg',
      platform: 'both',
      alternatives: [
        { name: 'Firefox', url: 'https://www.mozilla.org/firefox' },
        { name: 'LibreWolf', url: 'https://librewolf.net' },
        { name: 'Ungoogled Chromium', url: 'https://github.com/Eloston/ungoogled-chromium' }
      ]
    },
    { 
      id: '11', 
      companyName: 'Microsoft Edge', 
      description: 'Proprietary browser built on Chromium with Microsoft telemetry added. Alternatives: Firefox, LibreWolf, or Brave.', 
      categoryId: '5',
      platform: 'both',
      alternatives: [
        { name: 'Firefox', url: 'https://www.mozilla.org/firefox' },
        { name: 'Ungoogled Chromium', url: 'https://github.com/Eloston/ungoogled-chromium' }
      ]
    },
    
    // Development Tools
    { 
      id: '12', 
      companyName: 'Visual Studio Code', 
      description: '', 
      categoryId: '6',
      //logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Visual_Studio_Icon_2019.svg',
      platform: 'desktop',
      alternatives: [
        { name: '', url: '' },
        { name: '', url: '' }
      ]
    },
    { 
      id: '13', 
      companyName: 'IntelliJ IDEA Ultimate', 
      description: 'Proprietary version of JetBrains\' Java IDE with paid license.', 
      categoryId: '6',
      platform: 'desktop',
      alternatives: [
        { name: '', url: '' },
        { name: '', url: '' }
      ]
    },
    
    // Mobile Apps
    { 
      id: '14', 
      companyName: 'WhatsApp', 
      description: 'Closed-source messaging app owned by Meta (Facebook) with privacy concerns.', 
      categoryId: '10',
      platform: 'mobile',
      alternatives: [
        { name: 'Signal', url: 'https://signal.org' },
        { name: 'Element (Matrix)', url: 'https://element.io' }
      ]
    },
    { 
      id: '15', 
      companyName: 'Instagram', 
      description: 'Proprietary photo sharing platform owned by Meta with data collection concerns. Alternatives: Pixelfed (federated), Mastodon, or Pleroma.', 
      categoryId: '7',
      //logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
      platform: 'mobile'
    },
    
    // Music & Video
    { 
      id: '16', 
      companyName: 'Spotify', 
      description: 'Proprietary music streaming service with privacy concerns. Alternatives: Apple Music, Deezer, or Tidal.', 
      categoryId: '8',
      platform: 'mobile',
      alternatives: [
        { name: 'VLC - (Yalnızca Oynatıcı)', url: 'https://www.videolan.org/vlc/' },
        { name: 'RiMusic', url: 'https://rimusic.app' },
        { name: 'Auxio', url: 'https://auxio.app' }
      ]
    },

    // Maps & Navigation
    { 
      id: '17', 
      companyName: 'Google Maps', 
      description: 'Google\'s proprietary map service with privacy concerns.', 
      categoryId: '9',
      platform: 'both',
      alternatives: [
        { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org' },
        { name: 'OsmAnd', url: 'https://osmand.net' },
        { name: 'Organic Maps', url: 'https://organicmaps.app' }
      ]
    },
    { 
      id: '19',
      companyName: 'Yandex Maps', 
      description: 'Russian map service with privacy concerns.', 
      categoryId: '9',
      platform: 'both',
      alternatives: [
        { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org' },
        { name: 'OsmAnd', url: 'https://osmand.net' },
        { name: 'Organic Maps', url: 'https://organicmaps.app' }
      ]
    },
    
    // Communication
    { 
      id: '22', 
      companyName: 'Discord', 
      description: 'Closed-source chat and voice platform with privacy concerns and data collection practices. Alternatives: Element (Matrix), Mumble, or TeamSpeak.', 
      categoryId: '10',
      //logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/73/Discord_Color_SVG.svg',
      platform: 'both'
    }
  ];

  constructor() {
    // Sort flashcard items by id for consistent order
    this.flashcardItems.sort((a, b) => {
      return parseInt(a.id) - parseInt(b.id);
    });
  }

  getCategories(): Category[] {
    return [...this.categories];
  }

  getFlashcardItems(): FlashcardItem[] {
    return [...this.flashcardItems];
  }

  getFlashcardItemsByCategory(categoryId: string): Observable<FlashcardItem[]> {
    const items = this.flashcardItems.filter(item => item.categoryId === categoryId);
    return of(items);
  }

  getFlashcardItemsByPlatform(platform: 'desktop' | 'mobile' | 'both'): Observable<FlashcardItem[]> {
    const items = this.flashcardItems.filter(item => 
      item.platform === platform || item.platform === 'both'
    );
    return of(items);
  }

  getFlashcardItemsByCategoryAndPlatform(categoryId: string, platform: 'desktop' | 'mobile' | 'both'): Observable<FlashcardItem[]> {
    const items = this.flashcardItems.filter(item => 
      item.categoryId === categoryId && 
      (item.platform === platform || item.platform === 'both')
    );
    return of(items);
  }

  searchFlashcardItems(query: string): Observable<FlashcardItem[]> {
    if (!query || query.trim() === '') {
      return of(this.flashcardItems);
    }

    query = query.toLowerCase().trim();
    
    // First look for exact matches in company name
    let results = this.flashcardItems.filter(item => 
      item.companyName.toLowerCase().includes(query)
    );
    
    // If no exact matches, look for matches in description
    if (results.length === 0) {
      results = this.flashcardItems.filter(item => 
        item.description.toLowerCase().includes(query)
      );
    }
    
    // If still no matches, try fuzzy matching with Levenshtein distance
    if (results.length === 0) {
      results = this.flashcardItems.filter(item => {
        const companyNameWords = item.companyName.toLowerCase().split(' ');
        
        // Check if any word in the company name is "close" to the query
        return companyNameWords.some(word => {
          // Only check words of similar length to avoid false positives
          if (Math.abs(word.length - query.length) <= 3) {
            const distance = this.levenshteinDistance(word, query);
            // Allow more distance for longer words
            const threshold = Math.max(2, Math.floor(query.length / 3));
            return distance <= threshold;
          }
          return false;
        });
      });
    }

    return of(results);
  }

  private levenshteinDistance(a: string, b: string): number {
    const matrix = [];

    // Initialize matrix
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    // Fill matrix
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }
} 