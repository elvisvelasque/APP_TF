import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { slidesPage } from '../pages/slides/slides';

import { acercaPage } from '../pages/acerca/acerca';
import { creditosPage } from '../pages/creditos/creditos';
import { diagnosticosPage } from '../pages/diagnosticos/diagnosticos';
import { fotografiasPage } from '../pages/fotografias/fotografias';
//import { pielPage } from '../pages/piel/piel';
//import { preguntasPage } from '../pages/preguntas/preguntas';
//import { recomendacionesPage } from '../pages/recomendaciones/recomendaciones';
import { SQLite } from '@ionic-native/sqlite';
import { dbService } from '../providers/database-service';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = slidesPage;

  pages: Array<{title: string, component: any,icon: string, badge: string}> = [];

  constructor(
    platform: Platform, 
    public menuCtrl: MenuController,
    public sqlite: SQLite,
    public dbservice: dbService,

) {

    this.pages = [
      {title: 'Inicio', component: HomePage,icon: 'home', badge: 'Nuevo'},
      //{title: 'Mi Piel', component: pielPage,icon: 'body', badge: ''},
      {title: 'Historial', component: diagnosticosPage,icon: 'medkit', badge: ''},
      //{title: 'Recomendaciones', component: recomendacionesPage,icon: 'clipboard', badge: ''},
      {title: 'Registrar Paciente', component: acercaPage,icon: 'people', badge: ''},

      {title: 'Mis Fotografias', component: fotografiasPage,icon: 'image', badge: ''},
      //{title: 'Preguntas Frecuentes', component: preguntasPage,icon: 'help-circle', badge: ''},
      {title: 'Creditos', component: creditosPage,icon: 'medal', badge: ''},

    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.createDatabase();

    });
  }

  openPage(page: {title: string, component: any}): void {
    this.rootPage = page.component;
    this.menuCtrl.close();
  }

  private createDatabase(){
  this.sqlite.create({
    name: 'data.db',
    location: 'default' // the location field is required
  })
  .then((db) => {
    console.log(db);
    this.dbservice.setDatabase(db);
    return this.dbservice.createTable();
    
  })
  .catch(error =>{
    console.error(error);
    console.log("error en crear base")
  });
}

}
