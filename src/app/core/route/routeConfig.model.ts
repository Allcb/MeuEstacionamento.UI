import { Route } from '@angular/router';

export interface RouteConfig extends Route {
  hideLayout?: boolean;
  preload?: boolean;
  preloadDelay?: number;
  title?: string;
  preloadAfterRoute?: string;
}
