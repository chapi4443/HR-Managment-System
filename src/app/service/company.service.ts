import { Injectable } from '@angular/core';
import { Company } from '../model/company.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  private companiesUrl = '  http://localhost:4000/companies';

  constructor(private http: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companiesUrl);
  }

  getCompany(id: number): Observable<Company> {
    const url = `${this.companiesUrl}/${id}`;
    return this.http.get<Company>(url);
  }

  addCompany(company: Company): Observable<Company> {
    return this.http.post<Company>(this.companiesUrl, company);
  }

  updateCompany(id: number,company: Company): Observable<any> {
    const url = `${this.companiesUrl}/${company.id}`;
    return this.http.put(url, company);
  }

  deleteCompany(id: number): Observable<Company> {
    const url = `${this.companiesUrl}/${id}`;
    return this.http.delete<Company>(url);
  }
}
