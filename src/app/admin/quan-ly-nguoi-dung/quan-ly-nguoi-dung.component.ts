import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NguoiDungService } from 'src/app/core/services/nguoi-dung.service';
import { Router } from '@angular/router';
import { nguoiDung } from 'src/app/core/Models/nguoiDung';
import Sweet from 'sweetalert2';

@Component({
  selector: 'app-quan-ly-nguoi-dung',
  templateUrl: './quan-ly-nguoi-dung.component.html',
  styleUrls: ['./quan-ly-nguoi-dung.component.scss']
})
export class QuanLyNguoiDungComponent implements OnInit {

  @ViewChild('frmDangKy')frmDangKy:NgForm;
  constructor(private nguoiDungService: NguoiDungService, private router: Router) { }
  // mangNguoiDungDky: DanhSachNguoiDung;
  DSND:nguoiDung[]=[];
  tukhoa:any = '';
  cNhatStatus:boolean = false;
  // tKiemStatus: boolean = false;
  ngOnInit() {
    
      
  }
  timkiemNguoiDung(tukhoaTK){
    this.tukhoa=tukhoaTK;
    console.log(tukhoaTK);
    this.nguoiDungService.timKiemND(tukhoaTK).subscribe((data)=>{
    // console.log(data);
    this.DSND=[];
    this.DSND = data;
    console.log(this.DSND);
    })
    
  }
  dangKyAdmin(frmValue:nguoiDung){
    this.nguoiDungService.dangKyAdmin(frmValue).subscribe((data)=>{
      console.log(data);
      Sweet.fire(
        'Done!',
        'Thêm Người Dùng Thành Công!',
        'success'
      )
      this.DSND.push(frmValue);
      this.frmDangKy.reset();
      // this.router.navigate(["/dang-nhap"]);
    },error => {
      alert(error.error);
    })
    // console.log(frmValue);
    // console.log(this.mangNguoiDungDky.themNguoiDung(frmValue));
   
    // console.log(1);
    //console.log(this.DSND);
    // this.router.navigate(['/']);
  }
  CapNhatNgDung(frmValue:nguoiDung){

    const swalWithBootstrapButtons = Sweet.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger mr-3'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, do it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.nguoiDungService.capNhat(frmValue).subscribe((data)=>{
          console.log(data);
          Sweet.fire(
            'Done!',
            'Cập Nhật Người Dùng Thành Công!',
            'success'
          )
        },error => {
            alert(error.error);
          }
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Sweet.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Chưa Cập Nhật Người Dùng :)',
          'error'
        )
      }
    })
  }
  XoaND(ngdung){
    this.nguoiDungService.xoaNguoiDung(ngdung.taiKhoan).subscribe((data)=>{
      console.log(data);
      Sweet.fire(
        'Done!',
        'Xóa Người Dùng Thành Công!',
        'success'
      );
      this.timkiemNguoiDung(this.tukhoa);
    },error=>{
      console.log(1);
      alert(
        error.error
      )
    }
    )
  }



  CapNhat(ngdung){
    let ngdung1 = ngdung;
    ngdung1.maNhom = "GP10";
    ngdung1.maLoaiNguoiDung = "KhachHang";
    this.frmDangKy.setValue(ngdung1);
    this.cNhatStatus= true;
  }


  // timKiem(){
  //   this.tKiemStatus= true;
  // }

}
