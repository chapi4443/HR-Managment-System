import { Component, ViewChild } from '@angular/core';
import { Employee } from '../../model/employee.model';
import { EmployeeService } from '../../service/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/app/service/Core.service';
import { EmployeeAddComponent } from '../employee-add/employee-add.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
})
export class EmployeeListComponent {
  displayedColumns: string[] = [
    'no',
    'name',
    'companyName',
    'email',
    'phone',
    'address',
    'actions',
  ];
  dataSource!: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: EmployeeService,
    private _dialog: MatDialog,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.service.getEmployees().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  openAddForm() {
    const dialogRef = this._dialog.open(EmployeeAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployees();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmployeeAddComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployees();
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
    this.service.deleteEmployee(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Candidate deleted!', 'done');
        this.getEmployees();
      },
      error: console.log,
    });
  }
}
