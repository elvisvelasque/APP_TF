import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';




@Component({
  templateUrl: 'slides.html'
})
export class slidesPage {

  constructor(public navCtrl: NavController) {}

  slides = [
    {
      title: "Bienvenido a Micoskin!",
      description: "",
      image: "assets/img/slides/slide0.png",
    },
    {
      title: "¿Que es Micoskin?",
      description: "<b>Micoskin</b> es una aplicacion que te permite detectar si un paciente tiene mucosidad superficial y realizar un pre diagnostico.",
      image: "assets/img/slides/slide0.png",
    },
    {
      title: "¿Que es la mucosidad superficial?",
      description: "La <b>mucosidad superficial</b> es...",
      image: "assets/img/slides/slide0.png",
    }
  ];

  gohome() {
    this.navCtrl.setRoot(HomePage);
  }

}
