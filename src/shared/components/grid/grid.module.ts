import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { GridComponent } from './grid.component';
import { MatIconModule } from '@angular/material/icon';
  import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [GridComponent],
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  exports: [MatTableModule, GridComponent],
})
export class GridModule {}
