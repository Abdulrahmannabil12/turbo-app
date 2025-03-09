import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports:[ImageUploadComponent]
})
export class ImageUploadModule { }
