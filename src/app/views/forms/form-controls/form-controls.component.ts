import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormDirective,
  FormLabelDirective,
  FormControlDirective,
  ButtonDirective,
} from '@coreui/angular';
import {
  DxDataGridModule,
  DxFormModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import dxSelectBox from 'devextreme/ui/select_box';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-controls',
  templateUrl: './form-controls.component.html',
  styleUrls: ['./form-controls.component.scss'],
  standalone: true,
  imports: [
    HttpClientModule,
    DxDataGridModule,
    DxFormModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    DxSelectBoxModule,
    CommonModule,
    NgFor,
  ],
})
export class FormControlsComponent implements OnInit {
  tempID = JSON.parse(JSON.stringify(sessionStorage.getItem('id')));
  _id = parseInt(this.tempID);

  height = { height: 200 };

  _mainData: any = {};
  _subData: any = {};
  titleForms: any = {};

  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit(): void {
    this.getSubData();
    this.getMainData();
    this.getCategory();
  }

  getSubData() {
    this.http
      .get(`http://localhost:52169/api/NewAdd/subMain/${this._id}`)
      .subscribe((res) => {
        this._subData = res;
        this.getParam();
      });
  }

  getMainData() {
    this.http
      .get(`http://localhost:52169/api/NewAdd/main/${this._id}`)
      .subscribe((res) => {
        this._mainData = res;
        this.titleForms = this._mainData.Value[0];
      });
  }

  _category: any = [];
  category: any = {};
  // getCcategory
  getCategory() {
    this.http
      .get('http://localhost:52169/api/NewAdd/category')
      .subscribe((res) => {
        this.category = res;
        this.getCategoryTemp();
      });
  }
  getCategoryTemp() {
    for (let i = 0; i < this.category.Value.length; i++) {
      var data = {
        CATEGORY_ID: this.category.Value[i].CATEGORY_ID,
        CATEGORY_NAME: this.category.Value[i].CATEGORY_NAME,
      };

      this._category.push(data);
    }
  }

  back() {
    sessionStorage.clear();
    this.route.navigate(['/forms/validation']);
  }

  paramData: any = [];

  getParam() {
    for (let i = 0; i < this._subData.Value.length; i++) {
      var _id = this._subData.Value[i].TITLE_ID;
      var data = {};

      this.http
        .get(`http://localhost:52169/api/NewAdd/apiData/${_id}`)
        .subscribe((res) => {
          data = res;
          this.paramData.push(data);
        });
    }

    return this.getJsonData();
  }

  //JSON

  jsonData: any = [];

  getJsonData() {
    for (let i = 0; i < this._subData.Value.length; i++) {
      var _id = this._subData.Value[i].TITLE_ID;
      var data = {};

      this.http
        .get(`http://localhost:52169/api/NewAdd/jsonData/${_id}`)
        .subscribe((res) => {
          data = res;
          this.jsonData.push(data)

        });
    }
    this.getMetaData()

  }

  //metadata

  metaDataForm: any = [];

  getMetaData() {
    for (let i = 0; i < this._subData.Value.length; i++) {
      var _id = this._subData.Value[i].TITLE_ID;
      var data = {};

      this.http
        .get(`http://localhost:52169/api/NewAdd/metaData/${_id}`)
        .subscribe((res) => {
          data = res;
          this.metaDataForm.push(data);
        });
    }
  }

  _log(){
    var data = {
      TITLE : this.titleForms,
      SUBDATA : this._subData.Value,
      JSON : this.jsonData,
      META : this.metaDataForm
    }
    console.log('result : ', data);
  }


  _test(){
    var data = {
      TITLE : this.titleForms,
      SUB : this._subData,
      JSON : this.jsonData,
      PARAM : this.paramData,
      META : this.metaDataForm

    }

    console.log('data::::',data);

  }

}
