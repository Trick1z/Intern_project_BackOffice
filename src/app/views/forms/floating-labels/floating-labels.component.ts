import { IconDirective } from '@coreui/icons-angular';
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormArray } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormFloatingDirective,
  FormControlDirective,
  FormLabelDirective,
  FormDirective,
  FormSelectDirective,
  GutterDirective,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonDirective,
  ColDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  FormFeedbackComponent,
} from '@coreui/angular';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFileUploaderModule,
  DxFormModule,
  DxPopupModule,
  DxSelectBoxModule,
  DxTextAreaModule,
} from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { get } from 'lodash-es';
import { subscribeOn } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-floating-labels',
  templateUrl: './floating-labels.component.html',
  styleUrls: ['./floating-labels.component.scss'],
  standalone: true,
  imports: [
    DxFormModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    FormFloatingDirective,
    FormControlDirective,
    FormLabelDirective,
    ReactiveFormsModule,
    FormsModule,
    FormDirective,
    NgStyle,
    FormSelectDirective,
    GutterDirective,
    DxTextAreaModule,
    DxPopupModule,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonDirective,
    ColDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    DxButtonModule,
    DxDataGridModule,
    DxFileUploaderModule,
    HttpClientModule,
    DxSelectBoxModule,
    ListGroupDirective,
    ListGroupItemDirective,
    FormFeedbackComponent,
    NgFor,
    CommonModule,
  ],
})
export default class FloatingLabelsComponent implements OnInit {
  addParamPopup = false;
  addParamPopupDetail = false;
  jsonPopup = false;
  empty: any = {};

  getId = 0;

  _mainData: any = {};

  addParamData: any = {
    title_id: 0,
    parameter_name: '',
    parameter_status: '',
    parameter_type: 'String',
    parameter_description: '',
  };

  JsonData: any = {
    title_id: this.getId,
    json: '',
  };

  _required = ['Required', 'not required'];
  _method = ['GET', 'POST', 'PUT', 'DELETE'];

  height = { height: 150 };

  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit(): void {
    this.getCategory();
  }

  nevBack() {
    return this.route.navigate(['/forms/validation']);
  }

  //////

  subtitlePopup = false;
  _subTitleData: any = {};

  heights = { height: 150 };

  titleData = {
    TITLE: '',
    TITLE_DESCRIPTION: '',
    CATEGORY_ID: 0,
  };

  subTitleData = {
    SUB_TITLE: '',
    SUB_TITLE_DESCRIPTION: '',
    METHOD: '',
    URL: '',
  };

  _popupDataArr: any[] = [];
  _popupDataDetailArr: any[] = [];

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

  showAddMore = false;
  showButton = true;
  _returnID = 0;

  titleDataForm: any = {};
  //onsubmit
  onSubmitTitle() {
    var data = this.titleData;

    this.http
      .post('http://localhost:52169/api/NewAdd/main', data)
      .subscribe((res: any) => {
        this._returnID = res.Value;

        this.http
          .get(`http://localhost:52169/api/NewAdd/main/${this._returnID}`)
          .subscribe((data: any) => {
            this.titleDataForm = data.Value[0];
            this.getSubtitle();
          });
      });

    this.showButton = false;
    this.showAddMore = true;
  }

  showSubtitlePopup() {
    this.subtitlePopup = true;
  }

  onSubmitSubtitlePopupDetailClose() {
    return (this.subtitlePopup = false);
  }

  addMetaPopup = false;
  metaDataForm: any = {};

  showAddMeta() {
    this.addMetaPopup = true;
  }

  addMeta() {
    var data = {
      META_NAME: this.metaDataForm.META_NAME,
      META_DETAIL: this.metaDataForm.META_DETAIL,
    };
    this.http
      .post(`http://localhost:52169/api/NewAdd/meta`, data)
      .subscribe((res) => {
        this.addMetaPopup = false;
        this.metaDataForm = {};
      });
  }

  addMetaClose() {
    this.metaDataForm = {};
    this.addMetaPopup = false;
  }

  SubTitleDataArr: any = {};
  paramForms: any = [];
  paramFormsArr: any = [];
  jsonForms: any = {};
  metaForms: any = [];

  ParamValue: any = {};
  JsonValue: any = {};
  MetaValue: any = {};

  popupParam() {
    this.addParamPopup = true;
  }

  saveParam() {
    var data = {
      PARAMETER_NAME: this.ParamValue.PARAMETER_NAME,
      PARAMETER_STATUS: this.ParamValue.PARAMETER_STATUS,
      PARAMETER_TYPE: 'String',
      PARAMETER_DESCRIPTION: this.ParamValue.PARAMETER_DESCRIPTION,
    };

    this.paramForms.push(data);
    this.closeParam();
  }

  closeParam() {
    this.ParamValue = {};
    this.addParamPopup = false;
  }

  popupMeta() {
    this.addMetaPopup = true;
  }

  saveMeta() {
    var data = {
      META_NAME: this.MetaValue.META_NAME,
      META_DETAIL: this.MetaValue.META_DETAIL,
    };

    this.metaForms.push(data);
    this.closeMeta();
  }
  closeMeta() {
    this.MetaValue = {};
    this.addMetaPopup = false;
  }

  getSubtitle() {
    this.http
      .get(`http://localhost:52169/api/NewAdd/subMain/${this._returnID}`)
      .subscribe((res) => {
        this.SubTitleDataArr = res;
      });
  }
  editTitlePopup = false;
  editForm: any = {};

  openEditPopup() {
    this.editTitlePopup = true;
    this.editForm = this.titleDataForm;
  }

  onSaveEdit() {
    var data = this.editForm;
    this.http
      .put(`http://localhost:52169/api/NewAdd/main/${this._returnID}`, data)
      .subscribe((res) => {
        this.closeEditPopup;
      });

    this.editTitlePopup = false;
  }

  closeEditPopup() {
    this.http
      .get(`http://localhost:52169/api/NewAdd/main/${this._returnID}`)
      .subscribe((data: any) => {
        // this.editForm = data.Value[0];
        this.titleDataForm = data.Value[0];
      });

    this.editTitlePopup = false;
  }

  onSubmitSubtitlePopupDetail() {
    var data = {
      SUB_TITLE: {
        MAIN_ID: this._returnID,
        SUB_TITLE: this.subTitleData.SUB_TITLE,
        SUB_TITLE_DESCRIPTION: this.subTitleData.SUB_TITLE_DESCRIPTION,
        METHOD: this.subTitleData.METHOD,
        URL: this.subTitleData.URL

      },
      PARAM: this.paramForms,
      META: this.metaForms,
      JSON: this.jsonForms,
    };

    this.http
      .post('http://localhost:52169/api/NewAdd/insertParam', data)
      .subscribe((res) => {
        console.log('status : ', res);
        this.http
          .get(`http://localhost:52169/api/NewAdd/subMain/${this._returnID}`)
          .subscribe((res: any) => {
            this.SubTitleDataArr = res.Value;

          });
      });
    // return (this.subtitlePopup = false);
    console.log('result : ', data);
    this.subtitlePopup = false;
  }


}
