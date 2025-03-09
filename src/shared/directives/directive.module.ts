import { NgModule } from '@angular/core';
 import { OnlyNumber } from './onlynumber.directive';
import { HorizontalScrollDirective } from './wheelScroll.directive';
import { WidthChangeDirective } from './WidthChange.directive';
import { StickyHeaderDirective } from './stickyHeader.directive';
import { StickyDirective } from './sticky/stickyHeader.directive';

@NgModule({
  imports: [],
  declarations: [OnlyNumber, HorizontalScrollDirective, WidthChangeDirective, StickyDirective],
  exports: [OnlyNumber, HorizontalScrollDirective, WidthChangeDirective, StickyDirective],
})
export class DirectivesModule { }
