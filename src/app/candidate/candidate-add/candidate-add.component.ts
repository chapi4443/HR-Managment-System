import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from 'src/app/model/candidate.model';
import { CoreService } from 'src/app/service/Core.service';
import { CandidateService } from 'src/app/service/candidate.service';

@Component({
  selector: 'app-candidate-add',
  templateUrl: './candidate-add.component.html',
  styleUrls: ['./candidate-add.component.css'],
})
export class CandidateAddComponent {
  formGroup!: FormGroup;
  Id: number;

  constructor(
    private fb: FormBuilder,
    private candidateService: CandidateService,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private _coreService: CoreService,
    private _dialogRef: MatDialogRef<CandidateAddComponent>
  ) {
    this.createOccupationForm();
  }

  ngOnInit() {
    this.formGroup.patchValue(this.data);
  }

  clear() {
    this.createOccupationForm();
  }


  private createOccupationForm() {
    this.formGroup = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  get name() {
    return this.formGroup.get('name');
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


  save() {
    if (this.formGroup.valid) {
      if (this.data) {
        this.candidateService
          .updateCandidate(this.data.id, this.formGroup.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Candidate detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.candidateService.addCandidate(this.formGroup.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Candidate added successfully');
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
