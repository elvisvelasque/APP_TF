import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { slidesPage } from '../pages/slides/slides';

import { acercaPage } from '../pages/acerca/acerca';
import { creditosPage } from '../pages/creditos/creditos';
import { diagnosticosPage } from '../pages/diagnosticos/diagnosticos';
import { fotografiasPage } from '../pages/fotografias/fotografias';
import { pielPage } from '../pages/piel/piel';
import { preguntasPage } from '../pages/preguntas/preguntas';
import { recomendacionesPage } from '../pages/recomendaciones/recomendaciones';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = slidesPage;

  pages: Array<{title: string, component: any,icon: string, badge: string}> = [];

  constructor(platform: Platform, public menuCtrl: MenuController) {

    this.pages = [
      {title: 'Inicio', component: HomePage,icon: 'home', badge: 'Nuevo'},
      {title: 'Mi Piel', component: pielPage,icon: 'body', badge: ''},
      {title: 'Mi Diagnostico', component: diagnosticosPage,icon: 'medkit', badge: ''},
      {title: 'Recomendaciones', component: recomendacionesPage,icon: 'clipboard', badge: ''},
      {title: 'Mis Fotografias', component: fotografiasPage,icon: 'image', badge: ''},
      {title: 'Preguntas Frecuentes', component: preguntasPage,icon: 'help-circle', badge: ''},
      {title: 'Acerca de', component: acercaPage,icon: 'information-circle', badge: ''},
      {title: 'Creditos', component: creditosPage,icon: 'medal', badge: ''},

    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page: {title: string, component: any}): void {
    this.rootPage = page.component;
    this.menuCtrl.close();
  }
}
