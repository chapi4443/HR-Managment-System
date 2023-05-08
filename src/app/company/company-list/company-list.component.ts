import { Component, ViewChild } from '@angular/core';
import { Company } from '../../model/company.model';
import { MatTableDataSource } from '@angular/material/table';
import { CompanyService } from '../../service/company.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from 'src/app/service/Core.service';
import { CompanyAddComponent } from '../company-add/company-add.component';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent {
  displayedColumns: string[] = ['no', 'name', 'phone', 'address', 'actions'];
  dataSource!: MatTableDataSource<Company>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private companyService: CompanyService,
    private _dialog: MatDialog,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getCompanies();
  }

  getCompanies(): void {
    this.companyService.getCompanies().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  openAddForm() {
    const dialogRef = this._dialog.open(CompanyAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCompanies();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CompanyAddComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCompanies();
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
    this.companyService.deleteCompany(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Candidate deleted!', 'done');
        this.getCompanies();
      },
      error: console.log,
    });
  }
}
