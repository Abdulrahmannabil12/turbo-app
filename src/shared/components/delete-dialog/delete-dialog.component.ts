import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialog,
} from "@angular/material/dialog";
 @Component({
   selector: "app-delete-dialog",
   templateUrl: "./delete-dialog.component.html",
   styleUrls: ["./delete-dialog.component.scss"],
 })
 export class DeleteDialogComponent {
   isLoading = false;
   constructor(
     public dialogRef: MatDialogRef<DeleteDialogComponent>,
     public dialog: MatDialog,
     @Inject(MAT_DIALOG_DATA) public data: any
   ) {}

   onNoClick(): void {
     this.dialogRef.close();
   }
   Delete(val) {
     this.isLoading = true;
     setTimeout(() => {
           this.dialogRef.close(val);
          this.isLoading = false;

     }, 5000);
   }
 }
