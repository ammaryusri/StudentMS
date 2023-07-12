import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private url="Student";

  constructor(private http: HttpClient) { }

  public getStudents() : Observable<Student[]> {
    return this.http.get<Student[]>(`${environment.apiUrl}/${this.url}`);
  }
  public createStudents(stud : Student) : Observable<Student[]>{
    return this.http.post<Student[]>(`${environment.apiUrl}/${this.url}`,stud);
  }
  public updateStudents(stud : Student): Observable<Student[]>{
    return this.http.put<Student[]>(`${environment.apiUrl}/${this.url}`,stud);
  }
  public deleteStudents(stud : Student): Observable<Student[]>{
    return this.http.delete<Student[]>(`${environment.apiUrl}/${this.url}/(id)?id=${stud}`);
  }
}
