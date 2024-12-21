import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  FormDirective,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonGroupComponent,
  ButtonDirective,
} from '@coreui/angular';
import { DxFormModule } from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checks-radios',
  templateUrl: './checks-radios.component.html',
  styleUrls: ['./checks-radios.component.scss'],
  standalone: true,
  imports: [
    DxFormModule,
    RowComponent,
    ReactiveFormsModule,
    FormDirective,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonGroupComponent,
    ButtonDirective,
    HttpClientModule,
  ],
})
export class ChecksRadiosComponent implements OnInit {
  heights = { height: 120 };
  categoryForm: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit() {
    var data = this.categoryForm;
      Swal.fire({
        title: "ยืนยันการส่งข้อมูล ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน"
      }).then((result) => {
        if (result.isConfirmed) {

          this.http
          .post('http://localhost:52169/api/NewAdd/category', data)
          .subscribe((res) => {
            console.log('send status : ' , res );

          });

          return Swal.fire({
            title: "บันทึกข้อมูลแล้ว",
            icon: "success"
          });
        }else{
          return Swal.fire({
            title: "ยกเลิก บันทึกข้อมูล",
            icon: "success"
          });
        }
      });
  }
}
