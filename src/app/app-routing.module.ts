import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/auth/services/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./modules/errors/errors.module').then((m) => m.ErrorsModule),
  },

  {
    path: 'admin',
    loadChildren: () =>
      import('./_core/layout/layout.module').then((m) => m.LayoutModule),
  },
  {
    path: '',
    data:{
      layout:"dark-header"
    },
    loadChildren: () =>
      import('./pages/client-layout/client-layout.module').then((m) => m.ClientLayoutModule),
  },

  // Catch-all route for 404 errors
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
