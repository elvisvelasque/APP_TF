import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { dbService } from '../../providers/database-service';



@Component({
  selector: 'page-diagnosticos',
  templateUrl: 'diagnosticos.html'
})
export class diagnosticosPage {
tasks: any[] = [];
users: any[] = [];
fotos: any[] = [];
type: string;

constructor(public navCtrl: NavController, 
		    public dbservice: dbService,
			public navParams: NavParams) {
            this.type = "principal"
      }

ionViewDidLoad(){
  this.getAllUsers();
}

getAllTasks(){
  this.dbservice.getAll()
  .then(tasks => {
    this.tasks = tasks;
  })
  .catch( error => {
    console.error( error );
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

getAllFotos(user){
  this.dbservice.getSelect(user)
  .then(fotos => {
    this.tasks = fotos;
    this.type = "fotos";
  })
  .catch( error => {
    console.error( error );
  });
}

deleteTask(task: any, index){
    this.dbservice.delete(task)
    .then(response => {
      console.log( response );
      this.tasks.splice(index, 1);
    })
    .catch( error => {
      console.error( error );
    })
  }

}
