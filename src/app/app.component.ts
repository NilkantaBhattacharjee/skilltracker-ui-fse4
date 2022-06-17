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
    name: [{ value: '', disabled: false }],
    associateId: [{ value: '', disabled: false }],
    skill: [{ value: '', disabled: false }]
  });
  associateDetailList: AssociateDetails[] = [];
  associateDetail: any;
  showMsg: boolean = false;
  errorMsg: any;
  constructor(
    private fb: FormBuilder,
    private appService: AppService
  ) { }

  ngOnInit() {
    //this.searchForm.controls['name'].disable();
  }

  searchAssociates() {
    console.log('Search associate called..');
    this.associateDetailList.length = 0;
    let searchType: string;
    let searchValue: string;
    searchType = 'name';
    searchValue = this.searchForm.value['name'];
    if (searchValue == '' || searchValue == undefined) {
      searchType = 'associateId';
      searchValue = this.searchForm.value['associateId'];
    }
    if (searchValue == '' || searchValue == undefined) {
      searchType = 'skill';
      searchValue = this.searchForm.value['skill'];
    }
    if (searchValue == '' || searchValue == undefined) {
      this.errorMsg = 'Please enter search criteria in any of the below fields';
      this.showMsg = true;
    } else {
      console.log('searchType=' + searchType + ' and searchValue=' + searchValue);
      this.appService.getAsscociateDetails(searchType, searchValue).subscribe({
        next: (successResponse: any) => {
          if (successResponse.profiles) {
            this.associateDetail = successResponse.profiles[0];
            let profiles: any[] = successResponse.profiles;
            profiles.forEach(val => this.associateDetailList.push(Object.assign({}, val)));
          }
        },
        error: (error) => {
          console.log('error occured : ' + error.message);
          this.showMsg = true;
          this.errorMsg = 'Some unexpected error occured. Probably no records found. Please refine your search criteria.';
        },
        complete: () => {

        }
      });
    }
  }

  reset(form: FormGroup) {
    this.associateDetailList.length = 0;
    this.showMsg = false;
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control?.setValue('');
    });
    this.searchForm.controls['name'].enable();
    this.searchForm.controls['associateId'].enable();
    this.searchForm.controls['skill'].enable();
  }

  disableOtherFields(event: string) {
    if (event == 'name' && this.searchForm.controls['name'].value
      && this.searchForm.controls['name'].value != '') {
      this.searchForm.controls['associateId'].disable();
      this.searchForm.controls['skill'].disable();
    }
    else if (event == 'associateId' && this.searchForm.controls['associateId'].value
      && this.searchForm.controls['associateId'].value != '') {
      this.searchForm.controls['name'].disable();
      this.searchForm.controls['skill'].disable();
    }
    else if (event == 'skill' && this.searchForm.controls['skill'].value
      && this.searchForm.controls['skill'].value != '') {
      this.searchForm.controls['name'].disable();
      this.searchForm.controls['associateId'].disable();
    }
    else {
      this.searchForm.controls['name'].enable();
      this.searchForm.controls['associateId'].enable();
      this.searchForm.controls['skill'].enable();
    }
  }

}
