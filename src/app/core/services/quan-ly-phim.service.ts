import { Injectable, Output,EventEmitter } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, catchError, retry } from "rxjs/operators";
import { config } from '../Commons/Config';
import { Phim } from '../Models/phim';
import {ThongTinDatVe} from '../Models/thong-tin-dat-ve'
@Injectable({
  providedIn: 'root'
})
export class QuanLyPhimService {

  @Output() phatTrailer = new EventEmitter();
  @Output() datGhe = new EventEmitter();
  Slider:Phim[]= [
    {
      maPhim: 1701,
      tenPhim: 'Địa Đạo Cá Sấu Tử Thần - Crawl',
     
      hinhAnh: 'https://s3img.vcdn.vn/mobile/123phim/2019/07/dia-dao-ca-sau-tu-than-crawl-15645558446438_220x310.jpg',
      trailer:"https://www.youtube.com/watch?v=xYwC4oxldL0",
      
      biDanh: "",
      moTa: "https://s3img.vcdn.vn/123phim/2019/08/exit-15658707024185.jpg",
      maNhom: "GP10",
      // T12:00:00Z
      ngayKhoiChieu: "25-07-2019",
      danhGia: 7,
    },
    {
      maPhim: 1698,
      tenPhim: 'Chuyện Ngày Xưa Ở Hollywood',
      // giaTien: '75000',
      hinhAnh: 'https://s3img.vcdn.vn/mobile/123phim/2019/07/chuyen-ngay-xua-o-hollywood-once-upon-a-time-in-hollywood-15638864257140_220x310.jpg',
      trailer:"https://www.youtube.com/watch?v=NBdkQGFDNXY",
      // banner:'https://s3img.vcdn.vn/123phim/2019/08/once-15659258753493.jpg',
      biDanh: "",
      moTa: "https://s3img.vcdn.vn/123phim/2019/08/once-15659258753493.jpg",
      maNhom: "GP10",
      ngayKhoiChieu: "25-07-2019",
      danhGia: 6,
    },
    {
      maPhim: 1699,
      tenPhim: 'Angry Bird 2',
      // giaTien: '75000',
      hinhAnh: 'https://s3img.vcdn.vn/mobile/123phim/2019/08/angry-birds-2-15655946946940_220x310.jpg',
      trailer:"https://www.youtube.com/watch?v=RDj8Y2K0ODA",
      // banner:'https://s3img.vcdn.vn/123phim/2019/08/chym-15661840399175.jpg',
      biDanh: "",
      moTa: "https://s3img.vcdn.vn/123phim/2019/08/chym-15661840399175.jpg",
      maNhom: "GP10",
      ngayKhoiChieu: "25-07-2019",
      danhGia: 8,
    },
    {
      maPhim: 1793,
      tenPhim: 'Fast & Furious: Hobbs & Shaw',
      // giaTien: '75000',
      hinhAnh: 'https://s3img.vcdn.vn/mobile/123phim/2019/07/fast-furious-hobbs-shaw-15632769023721_220x310.jpg',
      trailer:"https://www.youtube.com/watch?v=b736ZM_KfEk",
      // banner:'https://s3img.vcdn.vn/123phim/2019/08/fast-furious-hobbs-shaw-c16-15646483028927.jpg',
      biDanh: "",
      moTa: "https://s3img.vcdn.vn/123phim/2019/08/fast-furious-hobbs-shaw-c16-15646483028927.jpg",
      maNhom: "GP10",
      ngayKhoiChieu: "25-07-2019",
      danhGia: 9,
    },
  ];


  constructor(private http: HttpClient) { }

  // DUNG TRONG DANH SACH PHIM COMPONENT
  layDanhSachPhim(): Observable<any> {
    const url = `${config.domain}QuanLyPhim/LayDanhSachPhim?maNhom=${config.maNhom}`;
    return this.http.get(url).pipe(
      tap(() => {

      }),
      catchError(err => {
        return this.handleError(err);
      })
    );
  }

  laySlider(){
    return this.Slider;
  }

  timKiemPhim(tuKhoa):Observable<any>{
    const url = `${config.domain}/QuanLyPhim/LayDanhSachPhim?maNhom=${config.maNhom}&tenPhim=${tuKhoa}`;
    return this.http.get(url).pipe(
      tap(()=>{

      }),
      catchError(err=>{
        return this.handleError(err);
      })
    )
  }

  layThongTinHeThongRap():Observable<any>{
    const url =`${config.domain}/QuanLyRap/LayThongTinHeThongRap`;
    return this.http.get(url).pipe(tap(()=>{

    }),
    catchError(err=>{
      return this.handleError(err);
    })
    );
  }

  layThongTinLichChieuTheoHTR(maHTR:string):Observable<any>{
    const url = `${config.domain}/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHTR}&maNhom=${config.maNhom}`;
    return this.http.get(url).pipe(
      tap(()=>{
        
      }),
      catchError(err =>{
        return this.handleError(err);
      })
    );
  }
  // DUNG TRONG TRANG CHI TIET
  layChiTietPhim(maPhim:number):Observable<any>{
    const url = `${config.domain}QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`;
    return this.http.get(url).pipe(
      tap(()=>{

      }),
      catchError(err =>{
        return this.handleError(err);
      })
    );
  }

  // DUNG TRONG TANG DAT VE
  layThongTinLichChieuPhim(maLichChieu):Observable<any>{
    const url = `${config.domain}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`;
    return this.http.get(url).pipe(
      tap(()=>{

      }),
      catchError(err=>{
        return this.handleError(err);
      })
    )
  }

  datVe(ttDatVe: ThongTinDatVe): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +
        localStorage.getItem(config.token)
    });
    const url = `${config.domain}QuanLyDatVe/DatVe`;
    let ob: any = this.http.post(url, ttDatVe, { headers: headers })

    return ob;
  }
  layThongTinTaiKhoan(taiKhoan):Observable<any>{
    const header = new HttpHeaders({
      'Authorization': 'Bearer ' +
      localStorage.getItem(config.token)
    });
    const url = `http://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan`;
    let ob: any = this.http.post(url, taiKhoan, { headers: header })

    return ob;
  }

  // DUNG TRONG TRANG ADMIN

  themPhim(phim: Phim): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +
        localStorage.getItem(config.token)
    });
    const url = `${config.domain}QuanLyPhim/ThemPhim`;
    let ob: any = this.http.post(url, phim, { headers: headers })

    return ob;
  }
  xoaPhim(maPhim):Observable<any>{
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+
      localStorage.getItem(config.token)
    });
    const url = `${config.domain}QuanLyPhim/XoaPhim?MaPhim=${maPhim}`;
    let ob: any = this.http.delete(url, { headers: header, responseType: 'text' });

    return ob;
  }
  capNhatPhim(phim):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +
        localStorage.getItem(config.token)
    });
    const url = `${config.domain}QuanLyPhim/CapNhatPhim`;
    let ob: any = this.http.post(url, phim, { headers: headers, responseType: 'text' })

    return ob;
  }
  // upHinhAnhPhim(formData):Observable<any>{
    
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Bearer ' +
  //       localStorage.getItem(config.token)
  //   });
  //   const url = `${config.domain}QuanLyPhim/UploadHinhAnhPhim`;
  //   let ob: any = this.http.post(url, formData, { headers: headers })

  //   return ob;
  // }
  upHinhAnhPhim(formData):Observable<any>{
    
    const headers = new HttpHeaders({

      'Authorization': 'Bearer ' +
        localStorage.getItem(config.token)
    });
    const url = `${config.domain}QuanLyPhim/UploadHinhAnhPhim`;
    let ob: any = this.http.post(url, formData, { headers: headers })

    return ob;
  }

  themLichChieu(lichChieuInsert):Observable<any>{
    const headers = new HttpHeaders({

      'Authorization': 'Bearer ' +
        localStorage.getItem(config.token)
    });
    const url = `${config.domain}QuanLyDatVe/TaoLichChieu`;
    let ob:any =  this.http.post(url,lichChieuInsert, {headers: headers})

    return ob;
  }  
  handleError(err) {
    if (err.codeStatus === 404) {
      alert(err.message);
    }
    return err;
  }
}
