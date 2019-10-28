

export class ThongTinDatVe{

    maLichChieu:number;
    taiKhoanNguoiDung:string;
    danhSachVe: DanhSachVe[] = []
    constructor(maLichChieu:number, taiKhoan: string, ){
        this.maLichChieu = maLichChieu;
        this.taiKhoanNguoiDung = taiKhoan;

    }
}

class DanhSachVe{
    maGhe:number;
    giaVe: number;
    constructor (maGhe:number,giaVe:number){
        this.giaVe=giaVe;
        this.maGhe = maGhe;
    }
}

