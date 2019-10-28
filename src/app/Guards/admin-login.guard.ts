import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { nextContext } from '@angular/core/src/render3';
import { NguoiDungService } from '../core/services/nguoi-dung.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginGuard implements CanActivate  {
  
  constructor (private router: Router, private ngdunglogin : NguoiDungService){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    if(localStorage.getItem('userLogin'))
    
    {
      let user = JSON.parse(localStorage.getItem('userLogin'));
      if(user.maLoaiNguoiDung === route.data.role){
        // alert('chao quan tri vien');
        return true;
      }
      else{
        this.router.navigate([""]);
        alert(" error");
        
        return false;
        
      }
      
    }
    else{
      alert('Bạn cần đăng nhập để vào trang này!');
      this.router.navigate(["/dang-nhap"]);
      return false;
    }
  }
  
  
}
