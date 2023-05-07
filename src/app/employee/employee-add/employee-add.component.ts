import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/app/model/company.model';
import { Employee } from 'src/app/model/employee.model';
import { CoreService } from 'src/app/service/Core.service';
import { CompanyService } from 'src/app/service/company.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent implements OnInit {
  formGroup: FormGroup;
  companies: Company[];

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private companyService: CompanyService,
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
      companyId: [0, [Validators.required]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.formGroup.patchValue(this.data);

    this.companyService.getCompanies().subscribe((res) => {
      console.log(res);
      this.companies = res;
    });
  }

  get name() {
    return this.formGroup.get('name');
  }
  get companyId() {
    return this.formGroup.get('companyId');
  }
  get email() {
    return this.formGroup.get('email');
  }
  get phone() {
    return this.formGroup.get('phone');
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
