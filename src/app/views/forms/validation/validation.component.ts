import { IconDirective } from '@coreui/icons-angular';
import { Component, OnInit } from '@angular/core';
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
  FormFeedbackComponent,
  InputGroupComponent,
  InputGroupTextDirective,
  FormSelectDirective,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonDirective,
  ListGroupDirective,
  ListGroupItemDirective,
} from '@coreui/angular';
import {
  DxButtonModule,
  DxDataGridModule,
  DxFormModule,
  DxPopupModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { get } from 'lodash-es';
import { Title } from 'chart.js';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
  standalone: true,
  imports: [
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
    FormFeedbackComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    FormSelectDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonDirective,
    ListGroupDirective,
    ListGroupItemDirective,
    HttpClientModule,
    DxButtonModule,
    DxPopupModule,
    DxSelectBoxModule,
  ],
})
export class ValidationComponent implements OnInit {
  _mainData: any = {};
  editPopup = false;
  dp_update_method = '';

  _method = ['GET', 'POST', 'PUT', 'DELETE'];
  _required = ['Required', 'not required'];

  editDataForm: any = {};
  titleForms: any = {};

  height = { height: 100 };

  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  nevAdd() {
    return this.route.navigate(['/forms/floating-labels']);
  }

  getData() {
    this.http
      .get('http://localhost:52169/api/NewAdd/main')
      .subscribe((data) => {
        this._mainData = data;
      });
  }

  subEditdata: any = {};
  subEditPopup = false;
  main_titleID = 0;

  titleForm: any = {};

  openMainEditPopup(getID: number) {
    this.subEditPopup = true;

    this.subEditdata = this._mainData.Value[getID];
    this.main_titleID = this._mainData.Value[getID].MAIN_ID;
    // console.log(this.main_titleID);
  }

  // openMainEditPopup(getID: number) {
  //   this.main_titleID = this._mainData.Value[getID].MAIN_ID;
  //   sessionStorage.setItem('id' , JSON.stringify(this.main_titleID))
  //   return this.route.navigate(['/forms/form-control'])
  // }

  openMainEditPopupClose() {
    this.subEditPopup = false;
    this.subEditdata = {};
  }

  onSubmitTitleEdit() {
    var data = this.subEditdata;

    this.http
      .put(`http://localhost:52169/api/NewAdd/main/${this.main_titleID}`, data)
      .subscribe((res) => {
        // console.log('update res : ', res);

        this.getData();
        this.openMainEditPopupClose();
      });
  }

  openEditPopup(getData: number) {
    this.editDataForm = this._mainData.Value[getData];
    this.dp_update_method = this.editDataForm.METHOD;

    return (this.editPopup = true);
  }

  openDeletePopup(getData: number) {
    //รับ ID จาก INDEX
    const _id = this._mainData.Value[getData].MAIN_ID;

    Swal.fire({
      title: `ลบข้อมูลที่ ${_id} ? `,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http
          .delete(`http://localhost:52169/api/NewAdd/main/${_id}`)
          .subscribe((data) => {
            this.getData();
          });

        return Swal.fire('เสร็จสิ้น', '', 'success'), this.getData();
      }

      return;
    });
  }

  onSubmitEdit(getID: number) {
    const _update = this.editDataForm;
    _update.METHOD = this.dp_update_method;

    this.http
      .put(`http://localhost:52169/api/NewAdd/main/${getID}`, _update)
      .subscribe((data) => {
        this.getData();
      });

    this.editDataForm = {};

    return Swal.fire('เสร็จสิ้น', '', 'success'), (this.editPopup = false);
  }

  onSubmitEditCancel() {
    this.editDataForm = {};
    this.dp_update_method = '';

    this.editPopup = false;
  }

  subTitle: any = {};
  addParamPopup = false;

  getShowID = 0;

  showData(getID: number) {
    this.addParamPopup = true;

    var _id = this._mainData.Value[getID].MAIN_ID;
    this.getShowID = _id;

    this.http
      .get(`http://localhost:52169/api/NewAdd/subMain/${_id}`)
      .subscribe((res) => {
        this.subTitle = res;
        // console.log('param :', this.subTitle);
        // console.log('id :', this.getShowID);
      });
  }

  showDataOnClose() {
    this.addParamPopup = false;
    this.subTitle = {};
  }

  onDelete(getID: number) {
    var _titleid = this.subTitle.Value[getID].TITLE_ID;

    // Swal.fire({
    //   title: `ลบข้อมูลที่ ${_titleid} ? `,
    //   showDenyButton: false,
    //   showCancelButton: true,
    //   confirmButtonText: 'ยืนยัน',
    //   cancelButtonText: 'ยกเลิก',
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.http
    //     .delete(`http://localhost:52169/api/NewAdd/subTitle/${_titleid}`)
    //     .subscribe((res) => {
    //       this.http
    //         .get(`http://localhost:52169/api/NewAdd/subMain/${this.getShowID}`)
    //         .subscribe((res) => {
    //           this.subTitle = res;
              console.log('param :', this.subTitle);
    //         });
    //     });

    //     return Swal.fire('เสร็จสิ้น', '', 'success'), this.getData();
    //   }

    //   return;
    // });
    this.http
      .delete(`http://localhost:52169/api/NewAdd/subTitle/${_titleid}`)
      .subscribe((res) => {
        this.http
          .get(`http://localhost:52169/api/NewAdd/subMain/${this.getShowID}`)
          .subscribe((res) => {
            this.subTitle = res;
            // console.log('param :', this.subTitle);
          });
      });
  }

  editSubTitleForm: any = {};
  editSubPopup = false;
  editSubTitle: any = {};
  edit_titleID = 0;

  onEdit(getID: number) {
    var _id = this.subTitle.Value[getID].TITLE_ID;
    this.edit_titleID = _id;
    this.editDataForm = this.subTitle.Value[getID];
    this.editPopup = true;
  }

  onSubmitSubtitleEdit() {
    const data = {
      TITLE_ID: this.edit_titleID,
      SUB_TITLE: this.editDataForm.SUB_TITLE,
      SUB_TITLE_DESCRIPTION: this.editDataForm.SUB_TITLE_DESCRIPTION,
      METHOD: this.editDataForm.METHOD,
      URL: this.editDataForm.URL,
    };

    this.http
      .put(`http://localhost:52169/api/NewAdd/subTitle`, this.editDataForm)
      .subscribe((res) => {
        this.http
          .get(`http://localhost:52169/api/NewAdd/subMain/${this.getShowID}`)
          .subscribe((res) => {
            this.subTitle = res;
          });
        this.onSubmitSubtitleEditClose();
      });
  }

  onSubmitSubtitleEditClose() {
    this.editDataForm = {};
    this.editPopup = false;
  }

  paramPopup = false;
  paramData: any = {};
  getId = 0;

  getParamData(temp: number) {
    var _titleid = this.subTitle.Value[temp].TITLE_ID;
    this.getId = _titleid;

    this.getJsonData(this.getId);
    this.getMetaData(this.getId);

    this.paramData = this.http
      .get(`http://localhost:52169/api/NewAdd/apiData/${_titleid}`)
      .subscribe((res) => {
        this.paramData = res;
        // console.log(this.paramData);
      });
    this.paramPopup = true;
  }

  getParamDataClose() {
    this.paramPopup = false;
    this.paramData = {};
  }

  onParamDelete(getID: number) {
    var _id = this.paramData.Value[getID].ID;

    this.http
      .delete(`http://localhost:52169/api/NewAdd/parameter/${_id}`)
      .subscribe((res) => {
        this.paramData = this.http
          .get(`http://localhost:52169/api/NewAdd/apiData/${this.getId}`)
          .subscribe((res) => {
            this.paramData = res;
            // console.log(this.paramData);
          });
      });
  }

  editParamDetail: any = {};
  editParamPopup = false;

  editID = 0;

  onParamEdit(getID: number) {
    this.editParamPopup = true;
    this.editID = this.paramData.Value[getID].ID;
    this.editParamDetail = this.paramData.Value[getID];
  }

  onParamEditSubmit() {
    const data = {
      ID: this.editID,
      PARAMETER_NAME: this.editParamDetail.PARAMETER_NAME,
      PARAMETER_STATUS: this.editParamDetail.PARAMETER_STATUS,
      PARAMETER_TYPE: 'String',
      PARAMETER_DESCRIPTION: this.editParamDetail.PARAMETER_DESCRIPTION,
    };

    this.http
      .put(`http://localhost:52169/api/NewAdd/parameter`, data)
      .subscribe((res) => {
        this.editParamPopup = false;

        this.http
          .get(`http://localhost:52169/api/NewAdd/apiData/${this.getId}`)
          .subscribe((res) => {
            this.paramData = res;
            // console.log(this.paramData);
          });
      });
  }

  onParamEditSubmitClose() {
    this.editParamDetail = {};
    this.editParamPopup = false;
  }

  getJsonDatas: any = {};
  jsonPopup = false;
  JsonData: any = {};

  addJson() {
    this.JsonData = {
      title_id: this.getId,
      json: this.JsonData.JSON,
    };

    this.http
      .post('http://localhost:52169/api/NewAdd/json', this.JsonData)
      .subscribe((data: any) => {
        if (data.StatusCode == 200) {
          this.getJsonData(this.getId);
          this.jsonPopup = false;
        } else {
          this.jsonEditPopup = false;
          this.paramPopup = false;
          this.addParamPopup = false;

          Swal.fire({
            title: 'มีข้อมูลในระบบแล้ว',
            confirmButtonText: 'ตกลง',
          }).then((result) => {
            if (result.isConfirmed) {
              this.getJsonData(this.getId);

              this.paramPopup = true;
              this.addParamPopup = true;
            }
          });
        }
      });

    this.jsonPopup = false;
  }

  addJsonClose() {
    this.JsonData = {
      title_id: this.getId,
      json: '',
    };
    this.jsonPopup = false;
  }

  showAddJson() {
    this.jsonPopup = true;
  }

  jsonEditPopup = false;
  showEditJson() {
    this.jsonEditPopup = true;
  }

  editJson() {
    var _data = this.getJsonDatas;

    // console.log('zzz', _data);

    this.http
      .put('http://localhost:52169/api/NewAdd/json', _data)
      .subscribe((data: any) => {
        // console.log('json send ', data);

        if (data.StatusCode === 505) {
          this.jsonEditPopup = false;
          this.paramPopup = false;
          this.addParamPopup = false;

          Swal.fire({
            title: 'ไม่พบน้อมูลในระบบ กรุณาเพิ่มข้อมูล',
            confirmButtonText: 'ตกลง',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.getJsonData(this.getId);

              this.paramPopup = true;
              this.addParamPopup = true;
            }
          });
        } else if (data.StatusCode === 200) {
          this.jsonEditPopup = false;
        }
      });
  }

  editJsonClose() {
    this.jsonEditPopup = false;
  }

  jsonTemp: any = {};
  getJsonData(id: number) {
    var _id = this.getId;

    this.getJsonDatas = this.http
      .get(`http://localhost:52169/api/NewAdd/jsonData/${_id}`)
      .subscribe((res) => {
        this.jsonTemp = res;
        this.getJsonDatas = this.jsonTemp.Value[0];
        // console.log('asd', this.getJsonDatas);
      });
  }

  getMetaData(id: number) {
    var _id = this.getId;

    this.http
      .get(`http://localhost:52169/api/NewAdd/metaData/${_id}`)
      .subscribe((res) => {
        this.metaData = res;
        // console.log('meta : ', this.metaData);
      });
  }

  onMetaDelete(id: number) {
    var _id = this.metaData.Value[id].ID;
    this.http
      .delete(`http://localhost:52169/api/NewAdd/metaData/${_id}`)
      .subscribe((res) => {
        this.getMetaData(this.getId);
      });
  }

  metaData: any = {};

  //meta
  metaDataForm: any = {};
  editMetaData: any = {};
  metaPopup = false;

  addMetaPopup = false;
  showAddMeta() {
    this.addMetaPopup = true;
  }

  onMetaEdit(id: number) {
    this.metaPopup = true;
    this.editMetaData = this.metaData.Value[id];
  }

  saveEditMeta() {
    var data = this.editMetaData;
    this.http
      .put(`http://localhost:52169/api/NewAdd/meta`, data)
      .subscribe((res) => {
        this.getMetaData(this.getId);
        this.editMetaClose()
      });
  }

  editMetaClose() {
    this.metaPopup =false
    this.editMetaData = {};
  }

  addMeta() {
    var data = {
      TITLE_ID: this.getId,
      META_NAME: this.metaDataForm.META_NAME,
      META_DETAIL: this.metaDataForm.META_DETAIL,
    };
    this.http
      .post(`http://localhost:52169/api/NewAdd/meta`, data)
      .subscribe((res) => {
        this.getMetaData(this.getId);
        this.addMetaPopup = false;
        this.metaDataForm = {};
      });
  }

  addMetaClose() {
    this.metaDataForm = {};
    this.addMetaPopup = false;
  }

  addNewSubtitleStatus = false;
  addNewSubTitlePopup() {
    this.addNewSubtitleStatus = true;
  }

  newSubForm: any = {};

  ///getShowID = 2

  onSubmitNewSub() {
    // Swal.fire({
    //   title: 'ยันยันการบันทึกข้อมูล ?',
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'ยืนยัน',
    // }).then((result) => {
    //   if (result.isConfirmed) {

    //   }
    // });

    var data = {
      MAIN_ID: this.getShowID,
      SUB_TITLE: this.newSubForm.SUB_TITLE,
      SUB_TITLE_DESCRIPTION: this.newSubForm.SUB_TITLE_DESCRIPTION,
      METHOD: this.newSubForm.METHOD,
      URL: this.newSubForm.URL,
    };
    this.http
      .post('http://localhost:52169/api/NewAdd/subMain', data)
      .subscribe((res) => {
        this.http
          .get(`http://localhost:52169/api/NewAdd/subMain/${this.getShowID}`)
          .subscribe((res) => {
            this.subTitle = res;
          });

        return (
          (this.addNewSubtitleStatus = false),
          Swal.fire({
            title: 'เพิ่มข้อมูลเเล้ว',
            icon: 'success',
          })
        );
      });
  }

  onSubmitNewSubClose() {
    this.addNewSubtitleStatus = false;
  }

  SubParamForm: any = {};
  SubParamPopup = false;

  showParamPopup() {
    this.SubParamPopup = true;
  }

  ParamPopup() {
    var data = {
      TITLE_ID: this.getId,
      PARAMETER_NAME: this.SubParamForm.PARAMETER_NAME,
      PARAMETER_DESCRIPTION: this.SubParamForm.PARAMETER_DESCRIPTION,
      PARAMETER_STATUS: this.SubParamForm.PARAMETER_STATUS,
      PARAMETER_TYPE: 'String',
    };

    this.http
      .post('http://localhost:52169/api/NewAdd/ParamDetail', data)
      .subscribe((res) => {
        this.http
          .get(`http://localhost:52169/api/NewAdd/apiData/${this.getId}`)
          .subscribe((res: any) => {
            this.paramData = res;
            this.SubParamForm = {};
            this.SubParamPopup = false;
          });
      });
  }

  ParamPopupClose() {
    this.SubParamForm = {};
    this.SubParamPopup = false;
    this.getParamData(this.getId);
  }

  // editMetaPopup = false;
  // metaEditForm:any = {}

  // editMeta(){
  // }
  // editMetaClose(){}
}
