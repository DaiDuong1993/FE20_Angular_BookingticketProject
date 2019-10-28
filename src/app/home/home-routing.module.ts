import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';

import { ChiTietPhimComponent } from './chi-tiet-phim/chi-tiet-phim.component';
import { ChiTietDatVeComponent } from './chi-tiet-dat-ve/chi-tiet-dat-ve.component';
import { DangNhapComponent } from './dang-nhap/dang-nhap.component';
import { TinTucComponent } from './tin-tuc/tin-tuc.component';

import { IsLoginGuard } from '../Guards/is-login.guard';


const routes: Routes=[
    {
        path:"",
        component:HomeComponent,
        children:[
            //Trang Chu
            {
                path:"",
                loadChildren:
                "./trang-chu/danh-sach-phim.module#DanhSachPhimModule"
            },
            // Trang Chi Tiet Phim
            {
                path:"chi-tiet-phim/:id",
                component:ChiTietPhimComponent
            },
            // Trang DatVe
            {
                path:"chi-tiet-dat-ve/:maPhim/:maLichChieu",
                component:ChiTietDatVeComponent,
                canActivate:[IsLoginGuard]
            },
            // trang Dang Nhap
            {
                path:"dang-nhap",
                component:DangNhapComponent

            },
            
            {
                path:"tin-tuc",
                component:TinTucComponent
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes),FormsModule],
    exports: [RouterModule]
  })
export class HomeRoutingModule {
    
}