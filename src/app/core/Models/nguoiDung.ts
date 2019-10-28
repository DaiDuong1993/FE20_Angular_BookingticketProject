export class nguoiDung{
    
        taiKhoan: string;
        matKhau: string;
        email: string;
        soDt: string;
        maNhom: string;
        maLoaiNguoiDung: string;
        hoTen: string;
      constructor(taiKhoan: string,matKhau: string,email: string,soDt: string,
        maLoaiNguoiDung: string, hoTen: string, maNhom: string ){
            this.taiKhoan= taiKhoan;
            this.matKhau = matKhau;
            this.email = email;
            this.soDt = soDt;
            this.maNhom = maNhom;
            this.maLoaiNguoiDung = maLoaiNguoiDung;
            this.hoTen = hoTen;
      }
}