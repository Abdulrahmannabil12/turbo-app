import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoOrderAvailableComponent } from './no-order-available/no-order-available.component';
import { SdNoDriverComponent } from './sd-no-driver/sd-no-driver.component';

@NgModule({
  declarations: [NoOrderAvailableComponent, SdNoDriverComponent],
  imports: [CommonModule],
  exports: [NoOrderAvailableComponent, SdNoDriverComponent],
})
export class IconsModule {}
