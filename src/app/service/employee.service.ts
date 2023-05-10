import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeesUrl = 'http://localhost:4000/employees';

  constructor(private http: HttpClient) {}

  // getEmployees(): Observable<Employee[]> {
  //   return this.http.get<Employee[]>(this.employeesUrl);
  // }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeesUrl, {
      params: { _expand: 'department' },
    });
  }

  getEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.get<Employee>(url);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee);
  }

  updateEmployee(id: number, employee: Employee): Observable<any> {
    const url = `${this.employeesUrl}/${employee.id}`;
    return this.http.put(url, employee);
  }

  deleteEmployee(id: number): Observable<Employee> {
    const url = `${this.employeesUrl}/${id}`;
    return this.http.delete<Employee>(url);
  }
}
