import { Routes } from '@angular/router';

const Routing: Routes = [

  {
    path: 'admin',
    data: {
      layout: 'empty'
    },

    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
          },
          {
            path: 'setting',
            loadChildren: () => import('../modules/profile/profile.module').then((m) => m.ProfileModule),
            // data: { layout: 'light-sidebar' },
          },
        ]
      },
    ]
  },

  {
    path: '',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
