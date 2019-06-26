import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { slidesPage } from '../pages/slides/slides';

import { acercaPage } from '../pages/acerca/acerca';
import { creditosPage } from '../pages/creditos/creditos';
import { diagnosticosPage } from '../pages/diagnosticos/diagnosticos';
import { fotografiasPage } from '../pages/fotografias/fotografias';
import { pielPage } from '../pages/piel/piel';
import { preguntasPage } from '../pages/preguntas/preguntas';
import { recomendacionesPage } from '../pages/recomendaciones/recomendaciones';

//Ionic camara providers
import { CameraProvider } from '../providers/util/camera.provider';
import { Camera } from '@ionic-native/camera';

//Ionic service provider
//import { Http } from '@angular/http';
import { micoskinService } from '../providers/micoskin-service';

//SQLITE
import { SQLite } from '@ionic-native/sqlite';
import { dbService } from '../providers/database-service';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    slidesPage,
    acercaPage,
    creditosPage,
    fotografiasPage,
    diagnosticosPage,
    pielPage,
    preguntasPage,
    recomendacionesPage,

  ],
  imports: [
   // Http,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    slidesPage,
    acercaPage,
    creditosPage,
    fotografiasPage,
    diagnosticosPage,
    pielPage,
    preguntasPage,
    recomendacionesPage,

  ],
  providers: [
  micoskinService,
  CameraProvider,Camera,
  SQLite,dbService,
  {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
