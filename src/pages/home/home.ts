import { Component } from '@angular/core';

import { CameraProvider } from '../../providers/util/camera.provider';
import { NavController,
		 Platform,
 		 ActionSheetController,
	     LoadingController} from 'ionic-angular';

import { micoskinService } from '../../providers/micoskin-service';
import { dbService } from '../../providers/database-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //panneaux: Array<{img: string}>;
  //tasks: any[] = [];
  chosenPicture: string;
  chosenPicture2: Array<{category:string, percent:any}> = [];
  public micoskinPicture: string;

  myActualDate: string;

  type: string;
  users: any[] = [];
  dni: string;
  //model = {"dni":""};
  docs: any[] = [];

  constructor(public navCtrl: NavController,

  	public actionsheetCtrl: ActionSheetController,
    public cameraProvider: CameraProvider,
    public micoskin: micoskinService,
    public dbservice: dbService,
    public platform: Platform,
    public loadingCtrl: LoadingController) {

    this.type = "principal";
    this.getAllUsers();
    //this.panneaux = [];

    
  }

   changeSearch(){
    this.type = "search"
   }

   changeDiagnostico() {
    this.type = "diagnostico"
   }

   changePrincipal() {
    this.type= "principal"
   }

   changePrincipal2() {
    this.createTask(); 
    this.type= "principal";
   }

   changePicture() {

    const actionsheet = this.actionsheetCtrl.create({
      title: 'Subir imagen',
      buttons: [
        {
          text: 'Camara',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            //       this.type = "search";

          this.takePicture();
          }
        },
        {
          text: !this.platform.is('ios') ? 'Galeria' : 'camera roll',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.getPicture();
          }
        },
        {
          text: 'Cerrar',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'destructive',
          handler: () => {
            console.log('the user has cancelled the interaction.');
          }
        }
      ]
    });
    return actionsheet.present();
  }

  takePicture() {
    const loading = this.loadingCtrl.create();

    loading.present();
    return this.cameraProvider.getPictureFromCamera().then(picture => {
      if (picture) {
      	this.type = "load";
        this.chosenPicture = picture;
        //this.imageData.image64 = picture;
      }
      loading.dismiss();
    }, error => {
      alert(error);
    });
  }

  getPicture() {
    const loading = this.loadingCtrl.create();

    loading.present();
    return this.cameraProvider.getPictureFromPhotoLibrary().then(picture => {
      if (picture) {
      	this.type = "load";
        this.chosenPicture = picture;
        //this.imageData.image64 = picture;

      }
      loading.dismiss();

    }, error => {
      alert(error);
    });
  }

  loadStats(jsonData) {
  var data = jsonData;
  if (data["success"] == true) {
    for (var category in data['confidence']) {
      var percent = Math.round(parseFloat(data["confidence"][category]) * 100);
      console.log(category)
      console.log(percent)
      this.chosenPicture2.push({category:category,percent:percent})
    
    }
   }
  }

  getAccuracy() {
    const loading = this.loadingCtrl.create();

    loading.present();

    //return this.micoskin.Classify(this.imageData).then(data => {
    return this.micoskin.Classify(this.chosenPicture).then(data => {
      if (data) {
      this.chosenPicture2 = [];	
      //this.chosenPicture = picture;
      this.loadStats(data)
      console.log(this.chosenPicture2[0])
      this.myActualDate = new Date(new Date().getTime()- new Date().getTimezoneOffset()*60*1000 ).toISOString().toString().substring(0, 10);
      console.log(this.myActualDate)

      if (this.chosenPicture2[0]['percent']>=85){
      	if(this.chosenPicture2[0]['category']=='catarata cortical'){
      		this.micoskinPicture='assets/img/piel/catarata_cortical.jpg'
      		//this.createTask()
          this.type="search"
      	}else{
          if(this.chosenPicture2[0]['category']=='catarata nuclear'){
            this.micoskinPicture='assets/img/piel/catarata_nuclear.jpg'
            //this.createTask()
            this.type="search"
          }else{
          this.type="nada"
          }
      	}

      }else{
      	this.type="nada"
      }

      
     
      }
      loading.dismiss();

    }, error => {
      console.log("what?")
      alert(error);
    });
  }

  getAllUsers(){
  this.dbservice.getUsers()
  .then(users => {
    this.users = users;
  })
  .catch( error => {
    console.error( error );
  });
}
submitted = false;
 
onSubmit() { this.submitted = true;
              this.createTask(); };

   getAllDocs(){
  this.dbservice.getUsersDocs()
  .then(docs => {
    this.docs = docs;
  })
  .catch( error => {
    console.error( error );
  });
}


 createTask(){
  this.dbservice.create(this.chosenPicture2[0]['category'],this.chosenPicture2[0]['percent'],this.myActualDate,this.chosenPicture,this.dni)
  .then(response  => {
  	console.log("registro creado correctamente")
  })
  .catch( error => {
    console.error( error );
  });
} 

}
