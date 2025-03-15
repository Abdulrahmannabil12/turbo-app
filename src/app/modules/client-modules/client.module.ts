import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  ClientRoutingModule } from './client.component-routing.module';
import {  ClientComponent } from './client.component';
import { OverviewComponent } from './overview/overview.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileDetailsComponent } from './settings/forms/profile-details/profile-details.component';
import { ConnectedAccountsComponent } from './settings/forms/connected-accounts/connected-accounts.component';
import { DeactivateAccountComponent } from './settings/forms/deactivate-account/deactivate-account.component';
import { EmailPreferencesComponent } from './settings/forms/email-preferences/email-preferences.component';
import { NotificationsComponent } from './settings/forms/notifications/notifications.component';
import { SignInMethodComponent } from './settings/forms/sign-in-method/sign-in-method.component';
import { DropdownMenusModule, WidgetsModule } from '../../_core/partials';
import {SharedModule} from "../../_core/shared/shared.module";

@NgModule({
  declarations: [
    ClientComponent,
    OverviewComponent,
    SettingsComponent,
    ProfileDetailsComponent,
    ConnectedAccountsComponent,
    DeactivateAccountComponent,
    EmailPreferencesComponent,
    NotificationsComponent,
    SignInMethodComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    DropdownMenusModule,
    WidgetsModule,
    SharedModule,
  ],
})
export class ClientModule {}
