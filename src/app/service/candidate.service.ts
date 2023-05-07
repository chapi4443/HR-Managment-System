import { Injectable } from '@angular/core';
import { Candidate } from '../model/candidate.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private candidatesUrl = 'http://localhost:4000/candidates';

  constructor(private http: HttpClient) {}

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.candidatesUrl);
  }

  getCandidate(id: number): Observable<Candidate> {
    const url = `${this.candidatesUrl}/${id}`;
    return this.http.get<Candidate>(url);
  }

  addCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>(this.candidatesUrl, candidate);
  }

  updateCandidate(id: number, candidate: Candidate): Observable<any> {
    const url = `${this.candidatesUrl}/${candidate.id}`;
    return this.http.put(url, candidate);
  }

  deleteCandidate(id: number): Observable<any> {
    const url = `${this.candidatesUrl}/${id}`;
    return this.http.delete<Candidate>(url);
  }
}
