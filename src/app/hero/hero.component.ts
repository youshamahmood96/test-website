import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

export interface DialogData {
   info : any
}

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  public apiData: any;
  constructor(private http: HttpClient,public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.http.get('https://api.punkapi.com/v2/beers')
      .subscribe(data => {
        this.apiData = data
        this.apiData = this.apiData.slice(1,13)
      });
  }
  openModal(input){
    this.dialog.open(DialogBoxComponent,{
      data:{
        info : input
      }
    })
  }
}
