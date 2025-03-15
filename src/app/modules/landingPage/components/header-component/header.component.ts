import { Component, Injector, OnInit, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BaseAuthService } from 'src/app/modules/auth/services/base.auth.service';
 import { PaginatorState } from 'src/app/_core/shared/crud-table';
 
@Component({
  selector: 'app-home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class headerComponent implements OnInit {
  constructor(private router: Router, private authService: BaseAuthService
  ) { }


  currentUser: any;
  navbarCollapsed = true;

  toggleNavbarCollapsing() {
    this.navbarCollapsed = !this.navbarCollapsed;
  }
  goToHome() {
    this.router.navigate(["/"]).then((e) => {
      const el = document?.getElementById("homeSection")

      el?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    });

    this.toggleNavbarCollapsing()
  }
  goToAbout() {

    this.router.navigate(["/"]).then(() => {
      document?.getElementById("aboutSection")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    });
    this.toggleNavbarCollapsing()


  }
  goToContact() {
    this.router.navigate(["/"]).then(() => {
      document?.getElementById("contactSection")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    });

    this.toggleNavbarCollapsing()
  } 
  goToPolicies() {
    this.router.navigate(["/privacy-policy"]) 

    this.toggleNavbarCollapsing()
  }
  goToHowItWorks() {
    this.router.navigate(["/"]).then(() => {
      document?.getElementById("howItWorkSection")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    });

    this.toggleNavbarCollapsing()


  }
  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue
  }
}
