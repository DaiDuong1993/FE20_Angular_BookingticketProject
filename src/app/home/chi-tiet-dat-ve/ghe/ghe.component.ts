import { Component, OnInit, Input } from '@angular/core';
import {QuanLyPhimService} from '../../../core/services/quan-ly-phim.service';
@Component({
  selector: 'app-ghe',
  templateUrl: './ghe.component.html',
  styleUrls: ['./ghe.component.scss']
})
export class GheComponent implements OnInit {
  @Input()gheInput:any={};
  dangDat:boolean = false;
  constructor( private qlPhimService:QuanLyPhimService) { }

  ngOnInit() {
  }
  datGhe(){
    this.dangDat = !this.dangDat;
    //Đặt ghế: gửi dữ liệu ghế đang đặt lên service 
    let gheDangDat:any = {
      maGhe:this.gheInput.maGhe,
      stt:this.gheInput.stt,
      giaVe:this.gheInput.giaVe,
      dangDat:this.dangDat
    }
    //gửi lên thông qua phương thức datGhe() của service
    this.qlPhimService.datGhe.emit(gheDangDat);



  }

}
