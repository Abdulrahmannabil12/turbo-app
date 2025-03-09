import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private matSnackBarConfig: MatSnackBarConfig = {};
  constructor(public snackBar: MatSnackBar, private ngZone: NgZone) {
    this.setSnackBarConfig();
  }

  private setSnackBarConfig(): void {
    this.matSnackBarConfig = new MatSnackBarConfig();
    this.matSnackBarConfig.verticalPosition = 'bottom';
    this.matSnackBarConfig.horizontalPosition = 'right';
    this.matSnackBarConfig.duration = 2000;
  }

  sucessMessage(message: string): void {
    this.ngZone.run(() => {
      this.setSnackBarConfig();
      this.snackBar.open(message, 'close', this.matSnackBarConfig);
    });
  }

  failMessage(message: string): void {
    this.ngZone.run(() => {
      this.setSnackBarConfig();
      this.matSnackBarConfig.panelClass = ['red-snackbar'];
      this.snackBar.open(message, '', this.matSnackBarConfig);
    });
  }
}
