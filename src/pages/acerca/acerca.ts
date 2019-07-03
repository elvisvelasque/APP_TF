import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { dbService } from '../../providers/database-service';
import { ToastController } from 'ionic-angular';



@Component({
  selector: 'page-acerca',
  templateUrl: 'acerca.html'
})

/*
class persona {

  constructor(
    public nombres: string,
    public apellidos: string,
    public dni: string,
    public sexo: string
  ) {  }

} */

export class acercaPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dbservice: dbService,
              public toastCtrl: ToastController
) {}

model = {"nombres":"","apellidos":"","dni":"", "sexo" : ""};

sexo = ['Masculino', 'Femenino'];

//model = new persona('Dr IQ',  'Chuck Overstreet','9689835' , this.sexo[0]);


submitted = false;
 
onSubmit() { this.submitted = true; }


presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Usuario creado correctamente',
      duration: 3000
    });
    toast.present();
  }
 
nuevaPersona() {

 this.dbservice.create2(this.model['nombres'],this.model['apellidos'],this.model['dni'],this.model['sexo'])
  .then(response  => {
  	console.log("Registro creado correctamente")
    this.presentToast();
    this.model = {"nombres":"","apellidos":"","dni":"", "sexo" : ""}
  })
  .catch( error => {
    console.error( error );
    this.model = {"nombres":"","apellidos":"","dni":"", "sexo" : ""}

  });
}

}
