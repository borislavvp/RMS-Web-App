import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  onMobile: boolean = false;
  navOpen: boolean = false;
  toBeColored: boolean = false;
  inAccount: boolean = false;
  numberOfItemsInBasket: number = 0;

  constructor(private router: Router, 
    private authService: AuthService,
    private basketService: BasketService) { }

  ngOnInit(): void {
    this.onMobile = window.innerWidth <= 1100;

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.navOpen = false;
        if(this.router.url === '/' || this.router.url === '/menu' || this.router.url === "/about" || this.router.url === "/gallery"){
          this.toBeColored = false;
        }
        else this.toBeColored = true;
      }
    });

    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd){
        if(event.url.match("/account")) this.inAccount = true;
        else this.inAccount = false;
      }
    });

    this.basketService.basket.subscribe(list => {
      this.numberOfItemsInBasket = 0;
      list?.items.forEach(item => {
        this.numberOfItemsInBasket += item?.quantity;
      });
    });
  }

  onResize(event){
    this.onMobile = event.target.innerWidth <= 1100;
  }

  toggleNav(){
    this.navOpen = !this.navOpen;
  }

  logout(){
    this.authService.Logout()
      .catch(() => console.log("Something went wrong!"));
  }

}
