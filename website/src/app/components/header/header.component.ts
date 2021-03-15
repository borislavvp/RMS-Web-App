import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  onMobile: boolean = false;
  navOpen: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.onMobile = window.innerWidth <= 1100;
  }

  onResize(event){
    this.onMobile = event.target.innerWidth <= 1100;
  }

  toggleNav(){
    this.navOpen = !this.navOpen;
  }

}
