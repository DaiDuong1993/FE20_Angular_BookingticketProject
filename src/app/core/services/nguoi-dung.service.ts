import { Injectable, Output,EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {config} from '../Commons/Config'
import { nguoiDung } from '../Models/nguoiDung';
@Injectable({
  providedIn: 'root'
})
export class NguoiDungService {
  @Output() dangNhapStatus = new EventEmitter;
  constructor(private http:HttpClient) { }

  
  dangNhap(taiKhoan:string, matKhau:string):Observable<any>{
    let ttDangNhap = {
      "taiKhoan": taiKhoan,
      "matKhau": matKhau
    }
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+
      localStorage.getItem(config.token)
    });
    const url = `${config.domain}QuanLyNguoiDung/DangNhap`;
    let ob = this.http.post(url,ttDangNhap,{headers:header});
    return ob;
  }
  dangKy(nguoiDung:nguoiDung):Observable<any>{
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+
      localStorage.getItem(config.token)
    });
    const url = `${config.domain}QuanLyNguoiDung/DangKy`;
    let ob = this.http.post(url,nguoiDung,{headers:header});
    return ob;
    
  }
  dangKyAdmin(nguoiDung:nguoiDung):Observable<any>{
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+
      localStorage.getItem(config.token)
    });
    const url = `${config.domain}QuanLyNguoiDung/ThemNguoiDung`;
    let ob = this.http.post(url,nguoiDung,{headers:header});
    return ob;
    
  }
  capNhat(nguoiDung:nguoiDung):Observable<any>{
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+
      localStorage.getItem(config.token)
    });
    const url =`${config.domain}QuanLyNguoiDung/CapNhatThongTinNguoiDung`;
    let ob = this.http.put(url,nguoiDung,{headers:header});
   
    return ob;
  }
  timKiemND(tuKhoa):Observable<any>{
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+
      localStorage.getItem(config.token)
    });
    const url = `${config.domain}QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${config.maNhom}&tuKhoa=${tuKhoa}`;
    let ob = this.http.get(url,{headers:header});
    return ob;
  }
  xoaNguoiDung(taiKhoan):Observable<any>{
    const header = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer '+
      localStorage.getItem(config.token)
    });
    const url = `${config.domain}QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`;
    let ob = this.http.delete(url,{headers:header,responseType: 'text'} );
    return ob;
  }
  layDanhSachNguoiDung():Observable<any>{
    let url = `${config.domain}QuanLyNguoiDung/LayDanhSachNguoiDung?${config.maNhom}`;
    let ob = this.http.get(url);
    return ob;
  }
}
