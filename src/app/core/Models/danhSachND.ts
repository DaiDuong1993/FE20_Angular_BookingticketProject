import { nguoiDung } from './nguoiDung';

export class DanhSachNguoiDung{
    DSND:nguoiDung[] = [];
    themNguoiDung(ngdung:nguoiDung){
        this.DSND.push(ngdung);
        return this.DSND;
    }
}