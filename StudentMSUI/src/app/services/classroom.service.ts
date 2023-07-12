import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classroom } from '../models/classroom';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  private url="Classroom";

  constructor(private http: HttpClient) { }

  public getClassrooms() : Observable<Classroom[]> {
    return this.http.get<Classroom[]>(`${environment.apiUrl}/${this.url}`)
  }
  public createClassrooms(classrms : Classroom) : Observable<Classroom[]>{
    return this.http.post<Classroom[]>(`${environment.apiUrl}/${this.url}`,classrms);
  }
  public updateClassrooms(classrms : Classroom): Observable<Classroom[]>{
    return this.http.put<Classroom[]>(`${environment.apiUrl}/${this.url}`,classrms);
  }
  public deleteClassrooms(classrms : Classroom): Observable<Classroom[]>{
    return this.http.delete<Classroom[]>(`${environment.apiUrl}/${this.url}/(id)?id=${classrms}`);
  }
}
