import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-preview-modal',
  template: `
    <div  mat-dialog-content class="p-0" >
      <img class='img-perv'src="{{imageUrl}}" alt="Preview Image" />
    </div>
  `,
  styles: [
    `
      .img-perv {
        max-width: 34em;
        max-height: 34em;
      }
    `,
  ],
})
export class ImagePreviewModalComponent {
  imageUrl: string;

  constructor(public dialogRef: MatDialogRef<ImagePreviewModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.imageUrl = data.imageUrl;
  }

  close() {
    this.dialogRef.close();

  }
}
