import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrl: './adminhome.component.scss'
})
export class AdminhomeComponent {
  constructor(private _Router:Router){}
  routeTo(str:String){
    this._Router.navigate(['admin/'+str])
  }
}
