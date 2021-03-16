import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  onMobile: boolean = false;
  navOpen: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.onMobile = window.innerWidth <= 1100;

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.navOpen = false;
      }
    });
  }

  onResize(event){
    this.onMobile = event.target.innerWidth <= 1100;
  }

  toggleNav(){
    this.navOpen = !this.navOpen;
  }

}
