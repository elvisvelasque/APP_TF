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
      title: "Focus Catarat",
      description: "",
      image: "assets/img/slides/slide_.png",
    },
    {
      title: "¿Focus Catarat?",
      description: "<b>Focus Catarat</b> es una aplicación móvil con el objetivo de brindar un sistema de apoyo al diagnóstico preliminar para una mejor precisión diagnostica.",
      image: "assets/img/slides/slide_.png",
    },
    {
      title: "¿Para qué sirve?",
      description: "Esta aplicación permite realizar un pre-diagnóstico para determinar la presencia de catarata senil en la lente natural del ojo, que se encuentra detrás de la pupila.",
      image: "assets/img/slides/slide_.png",
    }
  ];

  gohome() {
    this.navCtrl.setRoot(HomePage);
  }

}
