import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

  constructor(private basketService: BasketService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAuthenticated
      .then(logged => {
        if(logged) this.basketService.fetchBasket();
      })
  }

}
