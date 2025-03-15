import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home-hero-2',
  templateUrl: './hero-2.component.html',
  styleUrls: ['./hero-2.component.scss'],
  encapsulation:ViewEncapsulation.None,
 })

export class Hero2Component implements OnInit {
  constructor() {

   }
 
  ngOnInit(): void {

  }
}
