export interface INavigationService {
  navigateTo(path: string): void;
}

export class BrowserNavigationService implements INavigationService {
  navigateTo(path: string): void {
    window.location.href = path;
  }
}