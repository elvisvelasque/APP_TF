import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-piel',
  templateUrl: 'piel.html'
})
export class pielPage {
  type: string;  	

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.type = "principal"

  }

  changeTina(){
    this.type = "tina"
   }

   changePiti() {
    this.type = "pitiriasis"
   }

   changeCandi() {
    this.type = "candidiasis"
   }

   changePrincipal() {
    this.type= "principal"
   }

}
