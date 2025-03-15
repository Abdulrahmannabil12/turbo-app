import { ChangeDetectionStrategy, Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { BaseAuthService } from 'src/app/modules/auth/services/base.auth.service';
 
@Component({
  selector: 'app-home-hero-1',
  templateUrl: './hero-1.component.html',
  styleUrls: ['./hero-1.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation:ViewEncapsulation.None,
  providers: [NgbCarouselConfig],
 })

export class Hero1Component implements OnInit {
  constructor(config: NgbCarouselConfig, private authService: BaseAuthService
  ) { }


  currentUser: any;
  activeSlideIndex = 0;
  navbarCollapsed = true;

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue

  }
}
