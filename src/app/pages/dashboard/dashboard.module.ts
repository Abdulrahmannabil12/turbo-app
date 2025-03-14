import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
 import { DynamicContainerModule } from 'src/app/modules/dynamic-container/dynamic-container.module';
 import { ModalsModule, WidgetsModule } from 'src/app/_core/partials';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    WidgetsModule,
    ModalsModule,
    DynamicContainerModule
  ],
})
export class DashboardModule {}
