import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BreakpointObserverService {
  isHandset: Observable<BreakpointState>;
  isTablet: Observable<BreakpointState>;
  isWeb: Observable<BreakpointState>;
  isPortrait: Observable<BreakpointState>;
  isLandscape: Observable<BreakpointState>;

  constructor(private mqm: BreakpointObserver) {
    this.isHandset = this.mqm.observe([Breakpoints.HandsetLandscape, Breakpoints.HandsetPortrait]);
    this.isTablet = this.mqm.observe(Breakpoints.Tablet);
    this.isWeb = this.mqm.observe([Breakpoints.WebLandscape, Breakpoints.WebPortrait]);
    this.isPortrait = this.mqm.observe('(orientation: portrait)');
    this.isLandscape = this.mqm.observe('(orientation: landscape)');
  }
}
