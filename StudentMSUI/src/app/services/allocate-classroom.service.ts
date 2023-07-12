import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllocateClassroom } from '../models/allocateClassroom';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllocateClassroomService {
  private url="AllocateClassroom";

  constructor(private http: HttpClient) { }

  public createAllocateClassroom(allocateClassroom :AllocateClassroom): Observable<AllocateClassroom[]>{
    return this.http.post<AllocateClassroom[]>(`${environment.apiUrl}/${this.url}`,allocateClassroom);
  }

  public getAllocateClassroom() : Observable<AllocateClassroom[]>{
    return this.http.get<AllocateClassroom[]>(`${environment.apiUrl}/${this.url}`);
  }

  public deleteAllocatedClassroom(allocateClassroom:AllocateClassroom): Observable<AllocateClassroom[]>{
    return this.http.delete<AllocateClassroom[]>(`${environment.apiUrl}/${this.url}/(id)?id=${allocateClassroom}`);
  }
}
