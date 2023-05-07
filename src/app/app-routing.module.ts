import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidateListComponent } from './candidate/candidate-list/candidate-list.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { SaleryListComponent } from './salary/salery-list/salery-list.component';

const routes: Routes = [
  {
    path: 'candidates',
    component: CandidateListComponent,
    pathMatch: 'full',
  },
  {
    path: 'companies',
    component: CompanyListComponent,
    pathMatch: 'full',
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
    pathMatch: 'full',
  },
  {
    path: 'departments',
    component: DepartmentListComponent,
    pathMatch: 'full',
  },
  {
    path: 'salaries',
    component: SaleryListComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
