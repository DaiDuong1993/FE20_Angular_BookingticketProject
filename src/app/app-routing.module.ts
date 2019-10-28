import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsLoginGuard } from './Guards/is-login.guard';
import { AdminLoginGuard } from './Guards/admin-login.guard';

const routes1: Routes = [
  //trang home
  {
    path:"",
    loadChildren:"./home/home.module#HomeModule"
  },
  //trang Admin
  {
    path:"admin",
    loadChildren:"./admin/admin.module#AdminModule",
    canActivate: [AdminLoginGuard],
    data: {role: 'QuanTri'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes1)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
