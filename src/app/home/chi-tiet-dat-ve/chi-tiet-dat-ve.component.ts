import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import {QuanLyPhimService} from '../../core/services/quan-ly-phim.service';
import {LoaderInterceptorserviceService} from '../../core/services/loader-interceptorservice.service';
import {Subscription} from 'rxjs';
import Sweet from 'sweetalert2';
import {config} from '../../core/Commons/Config';
import { ThongTinDatVe } from '../../core/Models/thong-tin-dat-ve';
import { SweetAlertService } from '../../core/services/SweetAlertService';

@Component({
  selector: 'app-chi-tiet-dat-ve',
  templateUrl: './chi-tiet-dat-ve.component.html',
  styleUrls: ['./chi-tiet-dat-ve.component.scss']
})
export class ChiTietDatVeComponent implements OnInit, OnDestroy {

  constructor(private atvRoute: ActivatedRoute, private qlyPhimService: QuanLyPhimService, private route: Router ) { }
  subPram: Subscription;
  subService: Subscription;
  maPhim: any;
  lichChieu: any = {};
  thongTinPhim: any ={};
  danhSachGheDangDat: any[] = [];
  user:any={};
  tongTien:number = 0;
  // dung cho thogn tin ve xem phim
  //datveStatus: boolean = false;
  thongtinTK: any ={};
  thongtinve:any={};
  DSghedadat: any = [];
  tienmuave:number =0;

  chupStatus:boolean = false;


  ngOnDestroy() {
    this.subPram.unsubscribe();
    this.subService.unsubscribe();
  }
  ngOnInit() {
    
    this.subPram = this.atvRoute.params.subscribe((params)=>{
      console.log(params);
      this.maPhim = params.maPhim;
      this.layThongTInLichChieu(params.maLichChieu);
    });
    this.user = JSON.parse(localStorage.getItem('userLogin')); 
    this.qlyPhimService.datGhe.subscribe((gheDangDat) => {
      //Xử lý đặt ghế tại hàm subscribe từ output của service
      if (gheDangDat.dangDat) //dangDat = true
      {
        this.danhSachGheDangDat.push(gheDangDat);
      } else {
        let index = this.danhSachGheDangDat.findIndex(ghe => ghe.maGhe === gheDangDat.maGhe);
        if (index !== -1) {
          this.danhSachGheDangDat.splice(index, 1);
        }
      }
      console.log('mảng ghế đang đặt', this.danhSachGheDangDat);
      this.tinhTongTien();
    });
    //console.log(this.user.taiKhoan);
    this.layThongTinTaiKhoan(this.user.taiKhoan);
    this.count_down();
    const chup = document.getElementById("chup");
    const ve_btn = document.getElementById("ve_btn");
    const ve_tks = document.getElementById("ve_tks");
    chup.addEventListener("click", function(){
      ve_btn.style.display = "none";
      ve_tks.style.display = "block";
      setTimeout(function(){
        location.reload();
      }, 3000);
    })
  }

  count_down(){
    var countDownDate = 300000;
    //var countDownDate = 5000;
    // Update the count down every 1 second
    var x = setInterval(function () {

      // Get today's date and time
      var now = 0;

      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      countDownDate = countDownDate - 1000;
      // Time calculations for days, hours, minutes and seconds
      //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="demo"
      if(document.getElementById("time_count")){
        document.getElementById("time_count").innerHTML = minutes + "m " + seconds + "s ";
      }
      
      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        if(document.getElementById("handatve")){
          document.getElementById("handatve").style.display ='block';
        }
        
      }

    }, 1000);
  }
  reload(){
    //console.log(malichchieu);
    //this.route.navigate([`/chi-tiet-dat-ve/${malichchieu}`]);
    location.reload();
  }
  layThongTInLichChieu(maLichChieu:number){
    this.subService = this.qlyPhimService.layThongTinLichChieuPhim(maLichChieu).subscribe((data)=>{
      //console.log(data);
      this.lichChieu = data;
      this.thongTinPhim = data.thongTinPhim;
      console.log(this.thongTinPhim);
    })
  }

  tinhTongTien(){
    let tongTien = 0;
    this.danhSachGheDangDat.forEach((ghe,index) =>{
      tongTien+=ghe.giaVe;
    });
    this.tongTien = tongTien;
  }
  datVe(){
    //reset gia tri cua thong tin mua ve
    this.DSghedadat =[];
    this.tienmuave = 0;
      if(this.danhSachGheDangDat.length == 0){
      Sweet.fire('Thong Bao','Ban Chua Dat Ghe!','warning');
      return;
    }
    // Lấy dữ liệu user từ localStoreage
    const userLogin = JSON.parse(localStorage.getItem(config.userLogin));
    // Gọi API đưa dữ liệu lên serve
    let ttDatVe = new ThongTinDatVe(this.lichChieu.thongTinPhim.maLichChieu,userLogin.taiKhoan);
    ttDatVe.danhSachVe = this.danhSachGheDangDat;
    const swalWithBootstrapButtons = Sweet.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
    
    swalWithBootstrapButtons.fire({
      title: 'Bạn muốn mua vé chứ?',
      text: "Bạn sẽ không hoàn tác được thao tấc này",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Shut up and take my money!',
      cancelButtonText: 'No, I need see it again!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.qlyPhimService.datVe(ttDatVe).subscribe(result=>{
              console.log(result);
              
            }),error=>{
              console.log(error);
              alert(error.error)
            }
        swalWithBootstrapButtons.fire(
          'Thành Công!',
          'Bạn đã mua vé thành công',
          'success'
        )
        this.openPopUpVe();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Sweet.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Đã Hủy',
          'Hãy chọn ghế ngồi tốt hơn nhé :)',
          'error'
        )
      }
      this.layThongTInLichChieu(this.lichChieu.thongTinPhim.maLichChieu);
        this.layThongTinTaiKhoan(this.user.taiKhoan);
      
        this.DSghedadat= this.danhSachGheDangDat;
        this.danhSachGheDangDat=[];
        this.tienmuave = this.tongTien;
        this.tongTien = 0;
    });
    // SweetAlertService.showMessageConfirm(()=>{
      
      
    //   console.log(ttDatVe);
    //   // this.qlyPhimService.datVe(ttDatVe).subscribe(result=>{
    //   //   console.log(result);
        
    //   // }),error=>{
    //   //   console.log(error);
    //   //   alert(error.error)
    //   // }
    //   this.openPopUpVe();
    // }).then(()=>{
    //   //console.log(this.lichChieu.thongTinPhim.maLichChieu);
    //   this.layThongTInLichChieu(this.lichChieu.thongTinPhim.maLichChieu);
    //   this.layThongTinTaiKhoan(this.user.taiKhoan);
      
    //   this.DSghedadat= this.danhSachGheDangDat;
    //   this.danhSachGheDangDat=[];
    //   this.tienmuave = this.tongTien;
    //   this.tongTien = 0;
    // })
    
  }
  layThongTinTaiKhoan(taiKhoannd){
    let tk={
      taiKhoan :taiKhoannd,
    };
    //console.log(tk);
    this.qlyPhimService.layThongTinTaiKhoan(tk).subscribe((data)=>{
      //console.log(data);
      this.thongtinTK = data;
      console.log(this.thongtinTK);
      this.thongtinve = this.thongtinTK.thongTinDatVe[0];
    },error=>{
      alert(error);
    });
  }
  openPopUpVe(){
    const pop = document.getElementById("modal_ve");
    pop.style.display = "block";
    
  }

}
