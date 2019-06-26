import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class micoskinService {

  public name = "";
  private mEndpoint = 'https://cataratasserver.herokuapp.com';

  constructor(
    public http: Http
  ) {}

  private getUrl(command: string) {
    return this.mEndpoint + command;
  }
  //
   private extractData(res: Response) {
    //Convert the response to JSON format
    let body = res.json();
    //Return the data (or nothing)
    return body || {};
  }


  public Classify(image: string): Promise<any> {
    var formData: FormData = new FormData();
    formData.append("image64",image);
    let reqHeaders = new Headers();
    reqHeaders.set('Accept','application/json');
    reqHeaders.set('Acces-Control-Allow-Origin','*');
    reqHeaders.set('Access-Control-Allow-Methods','POST, GET, OPTIONS, PUT');
    let options = new RequestOptions({ headers: reqHeaders});
    console.log(options);
    return this.http.post(this.getUrl("/classify_image/classify/api/") , formData, options)
      .toPromise()
      .then(this.extractData);
  }
   
}