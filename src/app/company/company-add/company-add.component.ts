import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'src/app/service/Core.service';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.css'],
})
export class CompanyAddComponent {
  formGroup: FormGroup;
  Id: number;

  constructor(
    private fb: FormBuilder,
    private service: CompanyService,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<CompanyAddComponent>
  ) {
    this.createForm();
  }

  private createForm() {
    this.formGroup = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.formGroup.patchValue(this.data);
  }

  clear() {
    this.createForm();
  }

  get name() {
    return this.formGroup.get('name');
  }
  get phone() {
    return this.formGroup.get('phone');
  }
  get address() {
    return this.formGroup.get('address');
  }

  save() {
    if (this.formGroup.valid) {
      console.log(this.formGroup);

      if (this.data) {
        this.service
          .updateCompany(this.data.id, this.formGroup.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Company detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.service.addCompany(this.formGroup.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Company added successfully');
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
