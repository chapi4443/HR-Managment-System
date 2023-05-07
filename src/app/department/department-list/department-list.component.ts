import { Component, ViewChild } from '@angular/core';
import { Department } from '../../model/department.model';
import { DepartmentService } from '../../service/department.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/app/service/Core.service';
import { DepartmentAddComponent } from '../department-add/department-add.component';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss'],
})
export class DepartmentListComponent {
  displayedColumns: string[] = ['id', 'name', 'actions'];
  dataSource!: MatTableDataSource<Department>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private service: DepartmentService,
    private _dialog: MatDialog,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments(): void {
    this.service.getDepartments().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  openAddForm() {
    const dialogRef = this._dialog.open(DepartmentAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDepartments();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(DepartmentAddComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getDepartments();
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
    this.service.deleteDepartment(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Candidate deleted!', 'done');
        this.getDepartments();
      },
      error: console.log,
    });
  }
}
