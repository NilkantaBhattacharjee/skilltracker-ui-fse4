import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from './app-service.service';
import { AssociateDetails } from './model/associate-details';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  searchForm: FormGroup = this.fb.group({
    name: [{value: '', disabled: false}],
    associateId: [{value: '', disabled: false}],
    skill: [{value: '', disabled: false}]
  });
  associateDetailList: AssociateDetails[] = [];
  associateDetail: any;
  constructor(
    private fb: FormBuilder,
    private appService: AppService
  ) { }

  ngOnInit() { }

  searchAssociates() {
    console.log('Search associate called..' + this.searchForm.value['associateId']);
    this.associateDetailList.length = 0;
    let searhType: string;
    let searchValue: string;
    searhType = 'name';
    searchValue = this.searchForm.value['name'];
    if(searchValue == '') {
      searhType = 'associateId';
      searchValue = this.searchForm.value['associateId'];
    }
    if(searchValue == '') {
      searhType = 'skill';
      searchValue = this.searchForm.value['skill'];
    }
    this.appService.getAsscociateDetails(searhType, searchValue).subscribe({
      next: (successResponse: any) => {
        console.log('Success response : ' + successResponse);
        if (successResponse.profiles) {
          //this.associateDetailList = (successResponse.profiles as Partial<AssociateDetails>[]) ?? [];
          console.log('successResponse.profiles: ' + successResponse.profiles[0].userId);
          this.associateDetail = successResponse.profiles[0];
          let profiles: any[] = successResponse.profiles;
          profiles.forEach(val => this.associateDetailList.push(Object.assign({}, val)));
          console.log('associateDetailList: ' + this.associateDetailList[0].name);
          console.log('associateDetailList: ' + this.associateDetailList[0].skills[0].name);
        }
      },
      error: (error) => {
        console.log('error occured : ' + error);
      },
      complete: () => {

      }
    });
  }

  initFormModel(input?: any){
    const formModel = {
      name: [{value: '', disabled: false}],
      associateId: [{value: '', disabled: false}],
      skill: [{value: '', disabled: false}],
    };
    return formModel;
  }

  reset(form: FormGroup) {
    this.associateDetailList.length = 0;
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control?.setValue('');
    });
  }

}
