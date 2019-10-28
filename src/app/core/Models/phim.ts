export class Phim {
  maPhim: number;
  tenPhim: string;
  // giaTien: string;
  hinhAnh: string;
  trailer:string;
  // banner:string;
  biDanh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: any;
  danhGia: number;
  constructor(maPhim:number, tenPhim:string, hinhAnh:string, trailer:string, biDanh:string, moTa:string, maNhom:string, ngayKhoiChieu:string, danhGia:number){
    this.maPhim= maPhim;
    this.tenPhim = tenPhim;
    this.hinhAnh = hinhAnh;
    this.trailer = trailer;
    this.biDanh = biDanh;
    this.moTa = moTa;
    this.maNhom = maNhom;
    this.ngayKhoiChieu = ngayKhoiChieu;
    this.danhGia = danhGia;
    
  }
}

