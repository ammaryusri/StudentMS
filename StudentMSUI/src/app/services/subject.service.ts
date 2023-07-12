import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private url="Subject";

  constructor(private http: HttpClient) { }

  public getSubjects() : Observable<Subject[]> {
    return this.http.get<Subject[]>(`${environment.apiUrl}/${this.url}`)
  }
  public createSubjects(subj : Subject) : Observable<Subject[]>{
    return this.http.post<Subject[]>(`${environment.apiUrl}/${this.url}`,subj);
  }
  public updateSubjects(subj : Subject): Observable<Subject[]>{
    return this.http.put<Subject[]>(`${environment.apiUrl}/${this.url}`,subj);
  }
  public deleteSubjects(subj : Subject): Observable<Subject[]>{
    return this.http.delete<Subject[]>(`${environment.apiUrl}/${this.url}/(id)?id=${subj}`);
  }
}
