import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router'
import { NgForm  } from '@angular/forms';
import { QuanLyPhimService } from 'src/app/core/services/quan-ly-phim.service';
import { Phim } from 'src/app/core/Models/phim';
import Sweet from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-quan-ly-phim',
  templateUrl: './quan-ly-phim.component.html',
  styleUrls: ['./quan-ly-phim.component.scss']
})
export class QuanLyPhimComponent implements OnInit {
  @ViewChild('frmThemPhim')frmThemPhim:NgForm;
  
  DanhSachPhim:Phim[]=[];
  DSP:Phim[]=[];
  DSPold:Phim[]=[];
  capnhatStatus:boolean = false;
  constructor(private qlyPhim: QuanLyPhimService, private router: Router) { }

  ngOnInit() {
    this.DSPold=this.qlyPhim.laySlider();
    //console.log(this.DSPold);
    
    this.layDanhSachPhim();
    this.themLichChieu();
     
  }
  
  layDanhSachPhim(){
    this.qlyPhim.layDanhSachPhim().subscribe((data)=>{
      
      this.DanhSachPhim = data;
      console.log(this.DanhSachPhim);
    },error=>{
      console.log(error.error);
    })
  }
  themPhim(frmValue:Phim,hinhAnh){
    this.qlyPhim.themPhim(frmValue).subscribe((dat)=>{
      
      this.DSP = dat;
      console.log(this.DSP);
      this.upLoadHinh(hinhAnh,frmValue.tenPhim)
      this.layDanhSachPhim();
    },error=>{
      alert(error.error);
    })
  }
  // themPhimCoSan(phim:Phim[]){
    
  //   for (let i = 0; i < phim.length; i++) {

  //     let phimthem = phim[i];
  //     let linkfix = phimthem.trailer.split('watch?v=');
  //     console.log(linkfix);
      
  //     let linkfix2= linkfix[0]+"embed/"+linkfix[1];
  //     console.log(linkfix2);
  //     phimthem.trailer = linkfix2;
  //     console.log(phimthem.trailer);
  //     var thongtinPhim = new Phim(phimthem.maPhim,phimthem.tenPhim,phimthem.hinhAnh,phimthem.trailer, phimthem.biDanh,phimthem.moTa,phimthem.maNhom,phimthem.ngayKhoiChieu,phimthem.danhGia);
      
  //     this.themPhim(thongtinPhim);
  //   }
  // }
  xoaPhim(maPhim){
    this.qlyPhim.xoaPhim(maPhim).subscribe((data)=>{
      console.log(data);
      alert('Xóa Phim Thành Công!');
      this.DanhSachPhim.map((phim,index)=>{
        if(phim.maPhim === maPhim){
          this.DanhSachPhim.splice(index,1);
        }
      })
    },error=>{
      alert(error.error);
    })
  }
  doiCapNhat(phim){
    let ngaychieu = phim.ngayKhoiChieu;
    console.log(ngaychieu);
    let datePipe = new DatePipe("en-US");
    ngaychieu = datePipe.transform(ngaychieu, "dd/MM/yyyy");
    phim.ngayKhoiChieu = ngaychieu;
    this.capnhatStatus = true;
    console.log(1);
    this.frmThemPhim.form.setValue(phim);
    
    
    
    
    
  }
  capNhatPhim(frmValue,hinhAnh){
    Sweet.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      this.qlyPhim.capNhatPhim(frmValue).subscribe((data)=>{
        console.log(data);
        this.upLoadHinh(hinhAnh,frmValue.tenPhim)
        this.frmThemPhim.reset();
        if (result.value) {
          Sweet.fire(
            'Done!',
            'Your file has been updated.',
            'success'
          )
        }
        
      },error=>{
        alert(error.error);
        
        // this.router.navigateByUrl('/admin/quan-ly-phim');
      })
      
    })
    
  }
  upLoadHinh(hinhanh, tenPhim){
    const formData = new FormData();
    console.log(hinhanh.files[0]);
    
    formData.append('TenPhim',tenPhim);
    formData.append('MaNhom',"GP10");
    formData.append('File',hinhanh.files[0],hinhanh.files[0].name);
    
    this.qlyPhim.upHinhAnhPhim(formData).subscribe((data)=>{
      console.log(data);
    },error=>{
      alert(error.error);
    })
  }
  themLichChieu(){
    let lichChieu ={
      maPhim: 1793,
      ngayChieuGioChieu: "16/04/2019 10:00:00",
      maRap: 506,
      giaVe: 75000
    };
    this.qlyPhim.themLichChieu(lichChieu).subscribe((data)=>{
      console.log(data);
    },error=>{
      console.log(error.error);
    })
  }
}
