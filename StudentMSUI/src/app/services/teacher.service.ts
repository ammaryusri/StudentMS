import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private url="Teacher";

  constructor(private http: HttpClient) { }

  public getTeachers() : Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${environment.apiUrl}/${this.url}`);
  }

  public createTeachers(teach : Teacher) : Observable<Teacher[]>{
    return this.http.post<Teacher[]>(`${environment.apiUrl}/${this.url}`,teach);
  }

  public updateTeachers(teah : Teacher): Observable<Teacher[]>{
    return this.http.put<Teacher[]>(`${environment.apiUrl}/${this.url}`,teah);
  }

  public deleteTeacher(teach : Teacher): Observable<Teacher[]>{
    return this.http.delete<Teacher[]>(`${environment.apiUrl}/${this.url}/(id)?id=${teach}`);
  }
}
