import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { CandidateListComponent } from './candidate/candidate-list/candidate-list.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { SaleryListComponent } from './salary/salery-list/salery-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CandidateAddComponent } from './candidate/candidate-add/candidate-add.component';
import { CompanyAddComponent } from './company/company-add/company-add.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { DepartmentAddComponent } from './department/department-add/department-add.component';
import { EmployeeAddComponent } from './employee/employee-add/employee-add.component';
import { SalaryAddComponent } from './salary/salary-add/salary-add.component';

@NgModule({
  declarations: [
    AppComponent,
    CandidateListComponent,
    EmployeeListComponent,
    CompanyListComponent,
    DepartmentListComponent,
    SaleryListComponent,
    CandidateAddComponent,
    CompanyAddComponent,
    NavbarComponent,
    DepartmentAddComponent,
    EmployeeAddComponent,
    SaleryListComponent,
    SalaryAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatOptionModule,
    MatCardModule,
    FlexLayoutModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
