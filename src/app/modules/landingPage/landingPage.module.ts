import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/shared/components/Material/MaterialModule';
import { landingPageComponent } from './landingPage.component';
import { headerComponent } from './components/header-component/header.component';
import { Hero1Component } from './components/hero-1/hero-1.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { Hero2Component } from './components/hero-2/hero-2.component';
import { LineBetweenComponent } from './components/hero-2/line-between/line-between.component';
import { Hero3Component } from './components/hero-3/hero-3.component';
import { FooterComponent } from './components/footer/footer.component';
import { homeContentComponent } from './components/home-content/homeContent.component';
import { HomeRoutingModule } from './home-routing.module';


@NgModule({
  declarations: [landingPageComponent,
    headerComponent,
    LineBetweenComponent,
    Hero1Component,
    Hero2Component,
    Hero3Component,
    FooterComponent,
    homeContentComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    InlineSVGModule,
    CarouselModule.forRoot(),
    NgbModule,

  ],
})

export class landingPageModule {

}
