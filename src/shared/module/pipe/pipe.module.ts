import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CamelCasePipe } from './camel-case-pipe.';
import { EnumToStringPipe } from './enum-to-string-pipe.pipe';

@NgModule({
  declarations: [
    EnumToStringPipe,
    CamelCasePipe
  ],
  exports: [
    EnumToStringPipe,
    CamelCasePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipeModule { }
