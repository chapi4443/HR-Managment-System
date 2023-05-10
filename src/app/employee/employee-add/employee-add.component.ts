import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/app/model/company.model';
import { Department } from 'src/app/model/department.model';
import { Employee } from 'src/app/model/employee.model';
import { CoreService } from 'src/app/service/Core.service';
import { CompanyService } from 'src/app/service/company.service';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent implements OnInit {
  formGroup: FormGroup;
  departments: Department[];
  minDate = new Date();

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private departmentService: DepartmentService,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<EmployeeAddComponent>
  ) {
    this.createForm();
  }

  private createForm() {
    this.formGroup = this.fb.group({
      id: [0],
      departmentId: [0, [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required]],
      hiredDate: [Date, [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.formGroup.patchValue(this.data);

    this.departmentService.getDepartments().subscribe((res) => {
      console.log(res);
      this.departments = res;
    });
  }

  get firstName() {
    return this.formGroup.get('firstName');
  }
  get lastName() {
    return this.formGroup.get('lastName');
  }
  get gender() {
    return this.formGroup.get('gender');
  }
  get departmentId() {
    return this.formGroup.get('departmentId');
  }
  get email() {
    return this.formGroup.get('email');
  }
  get hiredDate() {
    return this.formGroup.get('email');
  }
  get phone() {
    return this.formGroup.get('hiredDate');
  }
  get address() {
    return this.formGroup.get('address');
  }

  clear() {
    this.createForm();
  }

  save() {
    if (this.formGroup.valid) {
      console.log(this.formGroup);

      if (this.data) {
        this.service
          .updateEmployee(this.data.id, this.formGroup.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.service.addEmployee(this.formGroup.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
