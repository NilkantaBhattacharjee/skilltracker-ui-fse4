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

  page: number = 1;
  count: number = 0;
  tableSize: number = 1;
  tableSizes: any = [1, 2, 3, 4, 5];

  searchType: string = '';
  searchValue: string = '';

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

  ngOnInit() { }

  searchAssociates() {
    console.log('Search associate called..');
    this.associateDetailList.length = 0;
    this.searchType = 'name';
    this.searchValue = this.searchForm.value['name'];
    if (this.searchValue == '' || this.searchValue == undefined) {
      this.searchType = 'associateId';
      this.searchValue = this.searchForm.value['associateId'];
    }
    if (this.searchValue == '' || this.searchValue == undefined) {
      this.searchType = 'skill';
      this.searchValue = this.searchForm.value['skill'];
    }
    if (this.searchValue == '' || this.searchValue == undefined) {
      this.errorMsg = 'Please enter search criteria in any of the below fields';
      this.showMsg = true;
    } else {
      console.log('searchType=' + this.searchType + ' and searchValue=' + this.searchValue);
      this.fetchAssociateDetails();
    }
  }

  fetchAssociateDetails() {
    this.appService.getAsscociateDetails(this.searchType, this.searchValue).subscribe({
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
        this.errorMsg = 'Some unexpected error occured. No records found. Please refine your search criteria.'
          + ' If problem continues, please contact system administrator.';
      },
      complete: () => {

      }
    });
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

  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchAssociateDetails();
  }

}
