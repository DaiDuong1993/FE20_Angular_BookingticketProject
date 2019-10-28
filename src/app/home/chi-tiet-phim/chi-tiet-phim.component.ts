import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import { QuanLyPhimService } from 'src/app/core/services/quan-ly-phim.service';

@Component({
  selector: 'app-chi-tiet-phim',
  templateUrl: './chi-tiet-phim.component.html',
  styleUrls: ['./chi-tiet-phim.component.scss']
})
export class ChiTietPhimComponent implements OnInit {
  subMovieDetail: Subscription;
  subParams: Subscription;
  maPhim:number;
  linkTrailer:string;
  hienthi:boolean = false;
  chiTietPhim: any={};
  htRapChieu: any =[];
  rating:number;
  strart_total =10;
  constructor(private quanLyDanhSachPhim : QuanLyPhimService,private activateRoute : ActivatedRoute ) { }

  ngOnInit() {
    this.subParams = this.activateRoute.params.subscribe((params)=>{
      this.maPhim = params.id;
      this.getMovieDetail(this.maPhim);
    })
    
     
    
  }
  hideVideo(){
    this.hienthi=false;
   
  }
  phatTrailer(){
    
    this.hienthi = true;
    let link = this.chiTietPhim.trailer+"?autoplay=1";
    this.linkTrailer = link;
    
  }


  getMovieDetail(maPhim:number){
    this.subMovieDetail = this.quanLyDanhSachPhim.layChiTietPhim(maPhim).subscribe((data)=>{
      console.log(data);
      this.chiTietPhim = data;
      this.htRapChieu = data.heThongRapChieu;
      this.rating=this.chiTietPhim.danhGia;
      //console.log(this.rating);
      this.getRating();
    })
  }

  getRating(){
    const star_Percentage = this.rating/this.strart_total*100;
    //console.log(star_Percentage);
    const star_Rercentage_Rounded = `${Math.round(star_Percentage/10)*10}%`;
    //console.log(star_Rercentage_Rounded);

    // set witdh for start-inner
    document.getElementById('star-inner').style.width = star_Rercentage_Rounded;
    document.getElementById('number-rating').innerHTML = `${this.rating}/<strong>10</strong>`
    document.getElementById('star-inner2').style.width = star_Rercentage_Rounded;
    document.getElementById('number-rating2').innerHTML = `${this.rating}/<strong>10</strong>`
  }
}
