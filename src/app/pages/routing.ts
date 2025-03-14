import { Routes } from '@angular/router';
import { AuthGuard } from '../modules/auth/services/auth.guard';

const Routing: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./user/user.module').then((m) => m.UserModule),
          },
          {
            path: 'setting',
            loadChildren: () =>
              import('../modules/profile/profile.module').then((m) => m.ProfileModule),
          },
        ]
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'  // Change to 'full' for an exact match
      },
    ]
  },

  // Removed the conflicting redirect
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

const ClientRouting: Routes = [

  {
    path: '',
  
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('../modules/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./user/user.module').then((m) => m.UserModule),
          },
          {
            path: 'setting',
            loadChildren: () =>
              import('../modules/profile/profile.module').then((m) => m.ProfileModule),
          },
        ]
      },
      {
        path: '',
        redirectTo: 'profile',
        pathMatch: 'full'
      },
    ]
  },

  // Removed the conflicting redirect
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing, ClientRouting };
