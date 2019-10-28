import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PipeModule} from '../../core/pipe/pipe.module';
import { DanhSachPhimComponent } from './danh-sach-phim.component';
import { DanhSachPhimRoutingModule } from './danh-sach-phim-routing.module';
import { ItemPhimComponent } from './item-phim/item-phim.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { VideoComponent } from './video/video.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DanhSachPhimComponent, ItemPhimComponent, VideoComponent],
  imports: [
    CommonModule,
    CarouselModule,
    DanhSachPhimRoutingModule,
    PipeModule,
    FormsModule
  ],
 
  exports:[
    VideoComponent,
  ]
})
export class DanhSachPhimModule { }
