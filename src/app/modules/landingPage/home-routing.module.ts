import { AuthComponent } from './../auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from '../auth/components/forgot-password/forgot-password.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { LogoutComponent } from '../auth/components/logout/logout.component';
import { RegistrationComponent } from '../auth/components/registration/registration.component';
import { homeContentComponent } from './components/home-content/homeContent.component';
import { landingPageComponent } from './landingPage.component';
import { PrivacyPolicyModule } from '../privacy-policy/privacy-policy.module';
import { PrivacyPolicyComponent } from '../privacy-policy/privacy-policy.component';


const routes: Routes = [
  {
    path: '',
    component: landingPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: homeContentComponent,
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent,
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('../../modules/auth/auth.module').then((m) => m.AuthModule),
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
