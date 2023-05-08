import { Component, ViewChild } from '@angular/core';
import { Salary } from '../../model/salary.model';
import { SalaryService } from '../../service/salary.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/app/service/Core.service';
import { SalaryAddComponent } from '../salary-add/salary-add.component';

@Component({
  selector: 'app-salery-list',
  templateUrl: './salery-list.component.html',
  styleUrls: ['./salery-list.component.scss'],
})
export class SaleryListComponent {
  displayedColumns: string[] = ['no', 'employeeName','amount', 'actions'];
  dataSource!: MatTableDataSource<Salary>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: SalaryService,
    private _dialog: MatDialog,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getSaleries();
  }

  getSaleries(): void {
    this.service.getSalaries().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  openAddForm() {
    const dialogRef = this._dialog.open(SalaryAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSaleries();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(SalaryAddComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getSaleries();
        }
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: number): void {
    this.service.deleteSalary(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Candidate deleted!', 'done');
        this.getSaleries();
      },
      error: console.log,
    });
  }
}
