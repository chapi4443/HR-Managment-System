import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Company } from 'src/app/model/company.model';
import { CoreService } from 'src/app/service/Core.service';
import { CompanyService } from 'src/app/service/company.service';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css'],
})
export class DepartmentAddComponent implements OnInit {
  formGroup: FormGroup;
  Id: number;
  companies: Company[];

  constructor(
    private fb: FormBuilder,
    private service: DepartmentService,
    private companyService: CompanyService,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<DepartmentAddComponent>
  ) {
    this.createForm();
  }

  private createForm() {
    this.formGroup = this.fb.group({
      id: [0],
      companyId: [0, [Validators.required]],
      name: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.formGroup.patchValue(this.data);

    this.companyService.getCompanies().subscribe((res) => {
      console.log(res);
      this.companies = res;
    })
  }

  clear() {
    this.createForm();
  }

  get name() {
    return this.formGroup.get('name');
  }
  get companyId() {
    return this.formGroup.get('companyId');
  }

  save() {
    if (this.formGroup.valid) {
      console.log(this.formGroup);

      if (this.data) {
        this.service
          .updateDepartment(this.data.id, this.formGroup.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Department detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.service.addDepartment(this.formGroup.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Department added successfully');
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
