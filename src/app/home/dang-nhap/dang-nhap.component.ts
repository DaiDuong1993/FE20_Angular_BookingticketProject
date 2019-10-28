import { Component, OnInit, ViewChild } from '@angular/core';
import { NguoiDungService } from 'src/app/core/services/nguoi-dung.service';
import { Router } from '@angular/router';
import { nguoiDung } from 'src/app/core/Models/nguoiDung';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dang-nhap',
  templateUrl: './dang-nhap.component.html',
  styleUrls: ['./dang-nhap.component.scss']
})
export class DangNhapComponent implements OnInit {
  @ViewChild('frmDangKy')frmDangKy:NgForm;
  constructor(private nguoiDungService: NguoiDungService, private router: Router) { }
  mangNguoiDungDky:nguoiDung[] =[];
  cNhatStatus:boolean = false;
  dKyStatus: boolean = false;
  ngOnInit() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }
  dangNhap(frmValue:any){

    //Gọi service đăng nhập
    this.nguoiDungService.dangNhap(frmValue.taiKhoan,frmValue.matKhau).subscribe((data)=>{
      console.log(data);
      //Lưu vào token
      localStorage.setItem('userLogin',JSON.stringify(data));
      localStorage.setItem('accessToken',data.accessToken);
      let dangNhapStatus: boolean = true;
      this.nguoiDungService.dangNhapStatus.emit(dangNhapStatus);
    },error => {
      alert(error.error);
    })
    // console.log(frmValue);

    
    this.router.navigate(['/']);
  }
  DangKy(frmValue:nguoiDung){
    this.nguoiDungService.dangKy(frmValue).subscribe((data)=>{
      console.log(data);
      this.frmDangKy.reset();
      this.router.navigate(["/dang-nhap"]);
    },error => {
      alert(error.error);
    })
    // console.log(frmValue);
    
    this.mangNguoiDungDky.push(frmValue);
    console.log(1);
    // console.log(this.mangNguoiDungDky);
    this.router.navigate(['/']);
  }
  CapNhatNgDung(frmValue:nguoiDung){

    this.nguoiDungService.capNhat(frmValue).subscribe((data)=>{
      console.log(data);

    },error => {
        alert(error.error);
      }
    )
    // console.log(frmValue);
  }




  CapNhat(ngdung:nguoiDung){
    this.frmDangKy.setValue(ngdung);
    this.cNhatStatus= true;
    
  }


  dangKyTK(){
    this.dKyStatus= true;
  }
}
