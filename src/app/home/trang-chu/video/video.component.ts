import { Component, OnInit, Input, HostListener } from '@angular/core';
import { QuanLyPhimService } from 'src/app/core/services/quan-ly-phim.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
 @Input()link:any;
 @Input()hienthi:any;
 
  constructor(private qlyPhimService:QuanLyPhimService) { }

  ngOnInit() {
    console.log(this.hienthi);
  }
  


}
