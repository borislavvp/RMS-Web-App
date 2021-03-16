import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemModalComponent } from './item-modal/item-modal.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dialog.open(ItemModalComponent, { 
      panelClass: 'custom-dialog',
      data: {
        name: 'Lorem item',
        description: "destcription lorem ipsum",
        ingredients: "list with ingredients"  
      },
      backdropClass: 'backdropBackground'
    });
  }

  openDialog(){
    this.dialog.open(ItemModalComponent, { 
      panelClass: 'custom-dialog',
      data: {
        name: 'Lorem item',
        description: "destcription lorem ipsum",
        ingredients: "list with ingredients"  
      },
      backdropClass: 'backdropBackground'
    });
  }

}
