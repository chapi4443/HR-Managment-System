import { Component, ViewChild } from '@angular/core';
import { Candidate } from '../../model/candidate.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CandidateService } from '../../service/candidate.service';
import { MatDialog } from '@angular/material/dialog';
import { CandidateAddComponent } from '../candidate-add/candidate-add.component';
import { CoreService } from 'src/app/service/Core.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss'],
})
export class CandidateListComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'phone',
    'address',
    'actions',
  ];
  dataSource!: MatTableDataSource<Candidate>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private candidateService: CandidateService,
    private _dialog: MatDialog,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CandidateAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CandidateAddComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  getEmployeeList() {
    this.candidateService.getCandidates().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCandidate(id: number): void {
   this.candidateService.deleteCandidate(id).subscribe({
     next: (res) => {
       this._coreService.openSnackBar('Candidate deleted!', 'done');
       this.getEmployeeList();
     },
     error: console.log,
   });
  }
}
