import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  closeStatus: boolean = false;
  constructor() {
    
   }

  ngOnInit() {
   
  }
  closeTag(){
    this.closeStatus = true; 
    this.hideMenu();
    
  }
  openTag(){
    this.closeStatus = false;
    this.hideMenu();
  }
  openMenu(){
    var hideNav = document.getElementById("menu-load");
    hideNav.classList.remove("hide-menu");
  }
  hideMenu(){
    var hideNav = document.getElementById("menu-load");
    var closeTag = document.getElementById("closetag");

    hideNav.classList.add("hide-menu");
    //closeTag.classList.add("close-tag")
    console.log(1);
  }
}
