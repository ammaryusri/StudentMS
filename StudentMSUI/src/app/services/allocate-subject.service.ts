import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AllocateSubject } from '../models/allocateSubject';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AllocateSubjectService {
  private url="AllocateSubject";

  constructor(private http: HttpClient) { }

  public createAllocateSubject(allocateSubject :AllocateSubject): Observable<AllocateSubject[]>{
    return this.http.post<AllocateSubject[]>(`${environment.apiUrl}/${this.url}`,allocateSubject);
  }

  public getAllocateSubject() : Observable<AllocateSubject[]>{
    return this.http.get<AllocateSubject[]>(`${environment.apiUrl}/${this.url}`);
  }

  public deleteAllocatedSubject(allocateSubject :AllocateSubject): Observable<AllocateSubject[]>{
    return this.http.delete<AllocateSubject[]>(`${environment.apiUrl}/${this.url}/(id)?id=${allocateSubject}`);
  }
}
