import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
  
  
  constructor(private router:Router) {
    //router: đối tượng dùng để chuyển hướng trang
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    //Hàm sẽ trả về giá trị true hoặc false => true là cho phép vào component, false 
    //Kiểm tra login 
    
    if(localStorage.getItem('userLogin'))
    {
      return true; 
    }
    alert('Bạn cần đăng nhập để đặt ghế!');
    this.router.navigate(["/dang-nhap"]);
    return false;
  }
  
  
  
}
