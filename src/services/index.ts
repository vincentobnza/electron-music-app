/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Business logic and services
 *
 * Place API calls, data management, and business logic here
 */

export class StorageService {
  static save(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static load<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  static remove(key: string): void {
    localStorage.removeItem(key);
  }
}
