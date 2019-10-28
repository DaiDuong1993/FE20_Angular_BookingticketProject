import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { QuanLyNguoiDungComponent } from './quan-ly-nguoi-dung/quan-ly-nguoi-dung.component';
import { QuanLyPhimComponent } from './quan-ly-phim/quan-ly-phim.component';

const routes2: Routes =[
    {
        path:"",
        component: AdminComponent,
        children:[
            //quan ly nguoi dung
            {
                path:"quan-ly-nguoi-dung",
                component: QuanLyNguoiDungComponent,
            },
            // quan ly phim
            {
                path:"quan-ly-phim",
                component: QuanLyPhimComponent,
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes2),FormsModule],
    exports: [RouterModule]
  })
export class AdminRoutingModule {
    
}

