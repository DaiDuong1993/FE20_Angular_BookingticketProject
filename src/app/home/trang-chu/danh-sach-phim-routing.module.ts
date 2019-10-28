import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DanhSachPhimComponent } from './danh-sach-phim.component';

const routes: Routes=[
    {
        path:"",
        component:DanhSachPhimComponent
    }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class DanhSachPhimRoutingModule{}