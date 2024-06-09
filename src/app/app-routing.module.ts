import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConfig } from './core/route/routeConfig.model';
import { configRoute } from './core/route/routing.module';

const routes: Routes | RouteConfig[] = configRoute([
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }
]);

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      urlUpdateStrategy: 'eager',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule { }
