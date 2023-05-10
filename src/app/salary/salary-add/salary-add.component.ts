import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from 'src/app/model/employee.model';
import { CoreService } from 'src/app/service/Core.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { SalaryService } from 'src/app/service/salary.service';

@Component({
  selector: 'app-salary-add',
  templateUrl: './salary-add.component.html',
  styleUrls: ['./salary-add.component.css'],
})
export class SalaryAddComponent implements OnInit {
  formGroup: FormGroup;
  employees: Employee[];

  constructor(
    private fb: FormBuilder,
    private employeeservice: EmployeeService,
    private service: SalaryService,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<SalaryAddComponent>
  ) {
    this.createForm();
  }

  private createForm() {
    this.formGroup = this.fb.group({
      id: [0],
      employeeId: [0, [Validators.required]],
      amount: [0, [Validators.required]],
      bonus: [0],
    });
  }

  ngOnInit() {
    this.formGroup.patchValue(this.data);

    this.employeeservice.getEmployees().subscribe((res) => {
      console.log(res);
      this.employees = res;
    });
  }

  get employeeId() {
    return this.formGroup.get('employeeId');
  }
  get amount() {
    return this.formGroup.get('amount');
  }
  get bonus() {
    return this.formGroup.get('bonus');
  }

  clear() {
    this.createForm();
  }

  save() {
    if (this.formGroup.valid) {
      console.log(this.formGroup);

      if (this.data) {
        this.service
          .updateSalary(this.data.id, this.formGroup.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Salary detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.service.addSalary(this.formGroup.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Salary added successfully');
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
