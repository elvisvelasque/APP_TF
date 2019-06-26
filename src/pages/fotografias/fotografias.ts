import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { dbService } from '../../providers/database-service';



@Component({
  selector: 'page-fotografias',
  templateUrl: 'fotografias.html'
})
export class fotografiasPage {

tasks: any[] = [];


constructor(public navCtrl: NavController, 
		    public dbservice: dbService,
			public navParams: NavParams) {}

ionViewDidLoad(){
  this.getAllTasks();
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
