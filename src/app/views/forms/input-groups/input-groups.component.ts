import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  InputGroupComponent,
  InputGroupTextDirective,
  FormControlDirective,
  FormLabelDirective,
  FormCheckInputDirective,
  ButtonDirective,
  ThemeDirective,
  DropdownComponent,
  DropdownToggleDirective,
  DropdownMenuDirective,
  DropdownItemDirective,
  DropdownDividerDirective,
  FormSelectDirective,
  TableModule,
} from '@coreui/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DxDataGridModule } from 'devextreme-angular';
import { DxiColumnModule, DxiItemModule } from 'devextreme-angular/ui/nested';

@Component({
  selector: 'app-input-groups',
  templateUrl: './input-groups.component.html',
  styleUrls: ['./input-groups.component.scss'],
  standalone: true,
  imports: [
    HttpClientModule,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    DocsExampleComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    FormControlDirective,
    FormLabelDirective,
    FormCheckInputDirective,
    ButtonDirective,
    ThemeDirective,
    DropdownComponent,
    DropdownToggleDirective,
    DropdownMenuDirective,
    DropdownItemDirective,
    RouterLink,
    DropdownDividerDirective,
    FormSelectDirective,
    ReactiveFormsModule,
    TableModule,
    DxDataGridModule,
    DxiItemModule,
    DxiColumnModule,
  ],
})
export class InputGroupsComponent implements OnInit {
  _mainData: any = {};
  _display: any [] = [ ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.http.get('http://localhost:52169/api/AddData').subscribe((data) => {
      this._mainData = data;
      console.log(this._mainData);
    });
  }

  _getDisplay(getID :number,getDP:number) {
    const _data = [];
    for (let i = 0; i < this._mainData.Value.length; i++) {
      if(this._mainData.Value[i].MAIN_ID === getID){
        _data.push(this._mainData.Value[i])
      }
    }
    return this._display[getDP] = _data ;

  }
}
