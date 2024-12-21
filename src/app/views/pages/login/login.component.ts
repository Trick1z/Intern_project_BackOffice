import { Component, NgModule, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import {
  ContainerComponent,
  RowComponent,
  ColComponent,
  CardGroupComponent,
  TextColorDirective,
  CardComponent,
  CardBodyComponent,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  ButtonDirective,
  FormModule,
} from '@coreui/angular';
import { DxFormModule, DxPopupModule } from 'devextreme-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ButtonDirective,
    DxFormModule,
    ContainerComponent,
    RowComponent,
    ColComponent,
    CardGroupComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    NgStyle,
    HttpClientModule,
    DxPopupModule,
  ],
})
export class LoginComponent implements OnInit {
  loginData: any = {};
  _userName: string = '';
  _userPw: string = '';
  showPopupReg = false;

  getApiData: any = {};

  popupRegisterDetail: any = {};

  url = 'http://localhost:52169/api/Login';

  height = { height: 300 };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getUser();
  }

  onLogin(username: string, password: string) {
    const data = {
      userName: username,
      userPassword: password,
    };

    this.http.post(this.url, data).subscribe((response: any) => {
      if (response.StatusCode === 200) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Done',
          showConfirmButton: false,
          timer: 500,
        });
        return '!= code 200';
        // return this.router.navigate(['/Home/list']);
      } else {
        for (let j = 0; j < this.getApiData.Value.length; j++) {
          if (username == this.getApiData.Value[j].USER_NAME) {
            return Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'รหัสผ่านไม่ถูกต้อง',
            });
          } else {
            return Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'ไม่พบ Account',
            });
          }
        }
        return
      }
    });

    return console.log('done', data);
  }

  onRegister() {
    this.showPopupReg = true;
  }

  onRegisterPopup(user: string, pw: string, c_pw: string) {
    for (let i = 0; i < this.getApiData.Value.length; i++) {
      if (user == this.getApiData.Value[i].USER_NAME) {
        return (this.showPopupReg = false), Swal.fire('มี user อยุ่ในระบบแล้ว');
      }
    }

    if (pw == c_pw) {
      const data = {
        user_name: user,
        user_password: pw,
        personal_name: user,
      };

      this.http
        .post('http://localhost:52169/api/Login/insertUser', data)
        .subscribe((res) => console.log('response :', res));

      this.popupRegisterDetail = {};
      this.showPopupReg = false;
      return Swal.fire('สมัค สำเร็จ');
    } else {
      this.popupRegisterDetail = {};
      this.showPopupReg = false;
      Swal.fire('รหัสผ่านไม่ตรงกัน');
    }

    return console.log('No condiction');
  }

  onRegisterPopupClose() {
    this.popupRegisterDetail = {};
    this.showPopupReg = false;
  }

  getUser() {
    this.http.get(this.url).subscribe((data) => {
      this.getApiData = data;
      console.log(this.getApiData);
    });
  }
  // onRegisterPopup(user:string , pw:string , c_pw:string) {
  //   const data = {
  //     user_name: user,
  //     user_password: pw,
  //     personal_name: user,
  //   };
  // }
}
