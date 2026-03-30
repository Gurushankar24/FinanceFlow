import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private platformId = inject(PLATFORM_ID);

  setItem(key: string, value: any): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem<T>(key: string): T | null {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(key);
      if (!data) return null;
      try {
        return JSON.parse(data) as T;
      } catch (e) {
        console.error('Error parsing storage data for key:', key, e);
        return null;
      }
    }
    return null;
  }
}
