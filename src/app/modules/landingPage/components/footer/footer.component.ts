import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  encapsulation: ViewEncapsulation.None,


 })

export class FooterComponent implements OnInit {
  constructor() {

   }



  ngOnInit(): void {

  }
}
