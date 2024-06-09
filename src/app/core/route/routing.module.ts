import { PageComponent } from "../layout/page/page.component";
import { RouteConfig } from "./routeConfig.model";


export function configRoute(MainRoutes: RouteConfig[]) {
  let routes: RouteConfig[] = [
  // pega rotas sem layout
    ...MainRoutes.filter((route) => route.hideLayout || !!route.redirectTo).map((route) => ({
      ...route,
      pathMatch: route.pathMatch || 'full',
      data:
        route.data && route.title
          ? { ...route.data, title: route.title }
          : !route.data && route.title
          ? { title: route.title }
          : {},
      canDeactivate: route.canDeactivate,
    })),
    {
      path: '',
      component: PageComponent,
      children: [
        // pega rotas com layout
        ...MainRoutes.filter((route) => !route.hideLayout && !route.redirectTo).map((route) => ({
          ...route,
          data:
            route.data && route.title
              ? { ...route.data, title: route.title }
              : !route.data && route.title
              ? { title: route.title }
              : {},
          canDeactivate: route.canDeactivate,
        })),
      ],
    },
  ];

  return routes;
}
