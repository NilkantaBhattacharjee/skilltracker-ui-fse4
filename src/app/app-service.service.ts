import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  getAsscociateDetails(searchBy:string, searchValue:string): Observable<any> {
    let url: string;
    switch(searchBy){
      case 'name':
        //url = 'http://localhost:9080/skill-tracker/api/v1/admin/name/';
        url = 'http://queryservice-env.eba-2rgvnhxx.ap-south-1.elasticbeanstalk.com/skill-tracker/api/v1/admin/name/';
        break;
      case 'associateId':
        //url = 'http://localhost:9080/skill-tracker/api/v1/admin/associateid/';
        url = 'http://queryservice-env.eba-2rgvnhxx.ap-south-1.elasticbeanstalk.com/skill-tracker/api/v1/admin/associateid/';
        break;
      case 'skill':
        //url = 'http://localhost:9080/skill-tracker/api/v1/admin/skill/';
        url = 'http://queryservice-env.eba-2rgvnhxx.ap-south-1.elasticbeanstalk.com/skill-tracker/api/v1/admin/skill/';
        break;
      default:
        //url = 'http://localhost:9080/skill-tracker/api/v1/admin/name/';
        url = 'http://queryservice-env.eba-2rgvnhxx.ap-south-1.elasticbeanstalk.com/skill-tracker/api/v1/admin/name/';
        break;
    }
    url = url + searchValue;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
  }); 
    return this.http.get(url, {headers: headers});
  }
}
