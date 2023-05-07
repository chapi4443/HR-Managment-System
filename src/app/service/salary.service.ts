import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Salary } from '../model/salary.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  private salariesUrl = 'http://localhost:4000/salaries';

  constructor(private http: HttpClient) {}

  getSalaries(): Observable<Salary[]> {
    return this.http.get<Salary[]>(this.salariesUrl);
  }

  getSalary(id: number): Observable<Salary> {
    const url = `${this.salariesUrl}/${id}`;
    return this.http.get<Salary>(url);
  }

  addSalary(salary: Salary): Observable<Salary> {
    return this.http.post<Salary>(this.salariesUrl, salary);
  }

  updateSalary(id: number,salary: Salary): Observable<any> {
    const url = `${this.salariesUrl}/${salary.id}`;
    return this.http.put(url, salary);
  }

  deleteSalary(id: number): Observable<Salary> {
    const url = `${this.salariesUrl}/${id}`;
    return this.http.delete<Salary>(url);
  }
}
