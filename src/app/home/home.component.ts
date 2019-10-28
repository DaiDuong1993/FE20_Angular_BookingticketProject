import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NguoiDungService } from '../core/services/nguoi-dung.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(private router: Router, private qlyNguoiDung: NguoiDungService) { }
  
  ngOnInit() {
    
    // scroll navbar funtion
    window.onscroll = function () { 
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      let element = document.getElementById("navbar");
      element.classList.add("fade_in");
      element.style.backgroundColor = "#d9771cec";
      element.style.padding = "-1px -1px";
      element.style.backgroundAttachment = "#d9771cec";
      $('svg').css("fill", "red");
      
      
      
    } else {
      let element = document.getElementById("navbar");
      element.classList.remove("fade_in");
      element.style.padding = "5px 5px";
      element.style.backgroundColor = "rgb(34, 190, 159)";
      $('svg').css("fill", "rgb(34, 190, 159)");
    } };
   
    
    
  }
  reDirect(){
    this.router.navigate(['/']);
    
  }
  
  
}
