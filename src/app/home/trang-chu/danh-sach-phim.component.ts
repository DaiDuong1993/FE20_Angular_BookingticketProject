import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { QuanLyPhimService } from 'src/app/core/services/quan-ly-phim.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Phim } from 'src/app/core/Models/phim';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-danh-sach-phim',
  templateUrl: './danh-sach-phim.component.html',
  styleUrls: ['./danh-sach-phim.component.scss']
})
export class DanhSachPhimComponent implements OnInit, OnDestroy{

  
  phimStatus: boolean = true;
  danhSachPhim:any =[];
  phimDangChieu: any =[];
  phimSapChieu:any = [];
  Slider: Phim[] = [];
  cinemaSystem: any = [];
  maHTR:string = "BHDStar";
  maPhim: number[] = [];
  cumRapTheoHtrRap: any=[];
  DSPtheoCumRap:any =[];

  linkTrailer:string;
  hienthi:boolean = false;
  phimChieu:any={
    hinhAnh:'',
    moTa:'',
    danhGia:''
  };
  dsPhimTimKiem:any=[];

  subCinemaSystem: Subscription;
  subIdParams: Subscription;
  
  subShowTimebyCS: Subscription;
  
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 800,
    // autoplay:true,
    // autoplayTimeout:1000,
    // autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      570:{
        items: 3
      },

      800: {
        items: 3
      },
      1100: {
        items: 4
      },
      1110: {
        items: 4
      },
    },
    nav: true,
  }
  customOptions1: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 600,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      },
      1040:{
        items:1
      }
    },
    nav: true,
    autoWidth:true,
    autoHeight: true
  }

  constructor(private quanLyDanhSachPhim : QuanLyPhimService) { }



  ngOnInit() {
    this.getSlider();
    this.getMovieList();
    this.getCinemaSystem();
    this.getCinemaCluster(this.maHTR);
    this.quanLyDanhSachPhim.phatTrailer.subscribe((linkTrailer)=>{
      // let linkfix = linkTrailer.link;
      // linkfix = linkfix.split('watch?v=');
      // console.log(linkfix);
      // this.linkTrailer = linkfix[0]+"embed/"+linkfix[1]+"?autoplay=1";
      this.linkTrailer= linkTrailer.link;
      //console.log(this.linkTrailer);
      this.hienthi = linkTrailer.show;
      
    });
    

  }
  ngOnDestroy() { //Hàm sẽ thực thi khi component xóa khỏi giao diện index.html
   //this.subIdParams.unsubscribe();
  //this.subMovieDetail.unsubscribe();
    this.subCinemaSystem.unsubscribe();
    
  }
  phatTrailerchoSlider(link){
    let linkfix = link;
    linkfix = linkfix.split('watch?v=');
    this.linkTrailer = linkfix[0]+"embed/"+linkfix[1]+"?autoplay=1";
    console.log(this.linkTrailer);
    this.hienthi = true;
  }
  hideVideo(){
    this.hienthi=false;
  }
  show(){
    this.phimStatus=true;
  }
  hide(){
    this.phimStatus=false;
  }
  
  changeCinemaCluster(maHTR:string){
    this.getCinemaCluster(maHTR);
  }
  getMovieList(){
    this.quanLyDanhSachPhim.layDanhSachPhim().subscribe((data:any)=>{
      this.danhSachPhim = data;
      data.map((phim, index)=>{
        if(index%2 === 0){
          this.phimDangChieu.push(phim);
          this.maPhim.push(phim.maPhim);
        }
        else{
          this.phimSapChieu.push(phim);
        }
      })
      //console.log(this.phimDangChieu);
      // console.log(this.phimSapChieu);
      // console.log(this.maPhim);

    });
    

  }
  
  getSlider(){
    this.Slider = this.quanLyDanhSachPhim.laySlider();
    
  }
  getCinemaSystem(){
    this.subCinemaSystem = this.quanLyDanhSachPhim.layThongTinHeThongRap().subscribe((data)=>{
      // console.log(data);
      this.cinemaSystem = data;
    })
  }
  
  getCinemaCluster(maHTR:string){
    this.subShowTimebyCS = this.quanLyDanhSachPhim.layThongTinLichChieuTheoHTR(maHTR).subscribe((data)=>{
      
      //console.log(data);
      if(data.length>0){
        this.cumRapTheoHtrRap = data[0].lstCumRap;
        //console.log( this.cumRapTheoHtrRap);
        //console.log(this.cumRapTheoHtrRap[0]);
        this.DSPtheoCumRap = this.cumRapTheoHtrRap[0].danhSachPhim;
        //console.log(this.DSPtheoCumRap);
        console.log(this.DSPtheoCumRap[0].maPhim);

        this.phimChieu = this.DSPtheoCumRap[0];
        this.danhSachPhim.map((phim,index)=>{
          if(phim.maPhim === this.phimChieu.maPhim){
            this.phimChieu.hinhAnh = phim.hinhAnh;
            this.phimChieu.moTa = phim.moTa;
            this.phimChieu.danhGia = phim.danhGia;
            // this.phimChieu.
          }
        })
        // this.quanLyDanhSachPhim.layChiTietPhim(this.DSPtheoCumRap[0].maPhim).subscribe((data)=>{
        //   console.log(data.heThongRapChieu[0].lichChieuPhim[0].maLichChieu);
        // })
      }
      else{
        this.cumRapTheoHtrRap=[];
        this.DSPtheoCumRap =[];
        this.phimChieu = {};
      }
      
    })
  }
  layDSPtheoCumRap(cumrap){
    this.DSPtheoCumRap= cumrap.danhSachPhim;
    console.log(this.DSPtheoCumRap);
    this.phimChieu = this.DSPtheoCumRap[0];
    this.danhSachPhim.map((phim,index)=>{
      if(phim.maPhim === this.phimChieu.maPhim){
        this.phimChieu.hinhAnh = phim.hinhAnh;
        this.phimChieu.moTa = phim.moTa;
        this.phimChieu.danhGia = phim.danhGia;
      }
    })
  }
  timKiemPhim(tukhoaTK){
    this.dsPhimTimKiem =[];
    console.log(tukhoaTK);
    this.quanLyDanhSachPhim.timKiemPhim(tukhoaTK).subscribe((data)=>{
      console.log(data);
      this.dsPhimTimKiem = data;
    },error=>{
      alert(error.error);
    })
  }
}
