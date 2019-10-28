import { Component, OnInit, Input,Output } from '@angular/core';
import { QuanLyPhimService } from 'src/app/core/services/quan-ly-phim.service';

@Component({
  selector: 'app-item-phim',
  templateUrl: './item-phim.component.html',
  styleUrls: ['./item-phim.component.scss']
})
export class ItemPhimComponent implements OnInit {
  @Input()phim: any;
  constructor(private qlyPhimService: QuanLyPhimService) { }

  ngOnInit() {
  }
  phatTrailer(){
    let linkTrailer = {
      link :this.phim.trailer+"?autoplay=1",
      
      show:true,
    }
    this.qlyPhimService.phatTrailer.emit(linkTrailer);
  }
}
