import { NgModule } from '@angular/core';
import { FileUploaderComponent } from './file-uploader.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg-2';
 

@NgModule({
  declarations: [ 
    FileUploaderComponent
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
    InlineSVGModule,
    FormsModule,
    ReactiveFormsModule,  ],
  exports: [FileUploaderComponent],
 
})
export class FileUploaderModule { }
