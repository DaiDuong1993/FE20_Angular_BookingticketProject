import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {PipeModule} from '../core/pipe/pipe.module';
import { HomeComponent } from './home.component';
import { ChiTietPhimComponent } from './chi-tiet-phim/chi-tiet-phim.component';
import { ChiTietDatVeComponent } from './chi-tiet-dat-ve/chi-tiet-dat-ve.component';
import { DangNhapComponent } from './dang-nhap/dang-nhap.component';
import { HomeRoutingModule } from './home-routing.module';
import { TinTucComponent } from './tin-tuc/tin-tuc.component';
import { GheComponent } from './chi-tiet-dat-ve/ghe/ghe.component';
import { HeaderComponent } from './header/header.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { VideoComponent } from './trang-chu/video/video.component';
import { LoaderComponent } from './loader/loader.component';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {LoaderInterceptorserviceService} from '../core/services/loader-interceptorservice.service';

@NgModule({
  declarations: [HomeComponent, ChiTietPhimComponent, ChiTietDatVeComponent, DangNhapComponent, TinTucComponent, GheComponent, HeaderComponent, LoaderComponent,],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    AngularFontAwesomeModule,
    PipeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorserviceService,
    multi: true
  }],

})
export class HomeModule { 
  // constructor(public http: HttpClient) {
  //   this.http.get('localhost/api/googleapiphp/powertag.php?q=car&count=3')
  //     .subscribe((r) => {
  //       console.log(r);
  //     });
  // }
 }
